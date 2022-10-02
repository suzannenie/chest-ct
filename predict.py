import os
import numpy as np
import time
import sys
import csv
import cv2
import matplotlib.pyplot as plt

import torch
import torch.nn as nn
import torch.backends.cudnn as cudnn
import torchvision
import torchvision.transforms as transforms
import torch.optim as optim
import torch.nn.functional as tfunc
from torch.utils.data import Dataset
from torch.utils.data.dataset import random_split
from torch.utils.data import DataLoader
from torch.optim.lr_scheduler import ReduceLROnPlateau
from PIL import Image
import torch.nn.functional as func

import sklearn.metrics as metrics
import random
import pandas as pd



if torch.cuda.is_available():
    device = torch.device('cuda')
else:
    device = torch.device('cpu')


class DenseNet121(nn.Module):
    """Model modified.
    The architecture of our model is the same as standard DenseNet121
    except the classifier layer which has an additional sigmoid function.
    """
    def __init__(self, out_size):
        super(DenseNet121, self).__init__()
        self.densenet121 = torchvision.models.densenet121(pretrained=True)
        num_ftrs = self.densenet121.classifier.in_features
        self.densenet121.classifier = nn.Sequential(
            nn.Linear(num_ftrs, out_size),
            nn.Sigmoid()
        )

    def forward(self, x):
        x = self.densenet121(x)
        return x


class MyModel ():
    
    def __init__ (self, pathModel, nnClassCount, transCrop):
       
        #---- Initialize the network
        model = DenseNet121(nnClassCount)
        model = torch.nn.DataParallel(model)
        
        modelCheckpoint = torch.load(pathModel, map_location=device)
        model.load_state_dict(modelCheckpoint['state_dict'])

        self.model = model
        self.model.eval()
        
        #---- Initialize the weights
        self.weights = list(self.model.module.densenet121.features.parameters())[-2]

        #---- Initialize the image transform
        normalize = transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        transformList = []
        transformList.append(transforms.Resize((transCrop, transCrop)))
        transformList.append(transforms.ToTensor())
        transformList.append(normalize)  
        self.transformSequence = transforms.Compose(transformList)
    
    def predict_class(self, img_file):
        imageData = Image.open(img_file).convert('RGB')
        imageData = self.transformSequence(imageData)
        imageData = imageData.unsqueeze_(0)
        l = self.model(imageData)
        output = self.model.module.densenet121.features(imageData)
        label = class_names[torch.max(l,1)[1]]
        return label
    
    #--------------------------------------------------------------------------------
     
    def generate (self, pathImageFile, pathOutputFile, transCrop):
        
        #---- Load image, transform, convert 
        with torch.no_grad():
 
            imageData = Image.open(pathImageFile).convert('RGB')
            imageData = self.transformSequence(imageData)
            imageData = imageData.unsqueeze_(0)
            l = self.model(imageData)
            output = self.model.module.densenet121.features(imageData)
            label = class_names[torch.max(l,1)[1]]
            #---- Generate heatmap
            heatmap = None
            for i in range (0, len(self.weights)):
                map = output[0,i,:,:]
                if i == 0: heatmap = self.weights[i] * map
                else: heatmap += self.weights[i] * map
                npHeatmap = heatmap.cpu().data.numpy()

        #---- Blend original and heatmap 
                
        imgOriginal = cv2.imread(pathImageFile, 1)
        imgOriginal = cv2.resize(imgOriginal, (transCrop, transCrop))
        
        cam = npHeatmap / np.max(npHeatmap)
        cam = cv2.resize(cam, (transCrop, transCrop))
        heatmap = cv2.applyColorMap(np.uint8(255*cam), cv2.COLORMAP_JET)
        
        img = cv2.addWeighted(imgOriginal,1,heatmap,0.35,0)            
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        plt.title(label)
        plt.imshow(img)
        plt.plot()
        plt.axis('off')
        plt.savefig(pathOutputFile)
        # plt.show()


    def visualize_features(self, pathImageFile, pathOutputFile):
        densenet = self.model.module.densenet121
        with torch.no_grad():
 
            imageData = Image.open(pathImageFile).convert('RGB')
            imageData = self.transformSequence(imageData)
            imageData = imageData.unsqueeze_(0)
            print(imageData.shape)
        # forward hooks
        t1, t2, t3 = [], [], []
        t1_handle = densenet.features.transition1.conv.register_forward_hook(lambda module, in_tensor, out_tensor: t1.append(out_tensor))
        t2_handle = densenet.features.transition1.conv.register_forward_hook(lambda module, in_tensor, out_tensor: t2.append(out_tensor))
        t3_handle = densenet.features.transition1.conv.register_forward_hook(lambda module, in_tensor, out_tensor: t3.append(out_tensor))

        # backward hooks
        bt1, bt2, bt3 = [], [], []
        bt1_handle = densenet.features.transition1.conv.register_backward_hook(lambda module, in_tensor, out_tensor: bt1.append(in_tensor))
        bt2_handle = densenet.features.transition1.conv.register_backward_hook(lambda module, in_tensor, out_tensor: bt2.append(in_tensor))
        bt3_handle = densenet.features.transition1.conv.register_backward_hook(lambda module, in_tensor, out_tensor: bt3.append(in_tensor))


        self.predict_class(pathImageFile)
        features = t1[0][0]
        fig, axs = plt.subplots(len(features)//12,12,figsize=(2*12,2*len(features)//12))
        for i, ax in enumerate(axs.flatten()):
            ax.imshow(features[i].detach().abs())
            ax.axis('off')
        plt.savefig(pathOutputFile)
        plt.show()
        



nnIsTrained = False                 #pre-trained using ImageNet
nnClassCount = 14                   #dimension of the output
imgtransResize = (320, 320)
imgtransCrop = 224
# Class names
class_names = ['No Finding', 'Enlarged Cardiomediastinum', 'Cardiomegaly', 'Lung Opacity', 
               'Lung Lesion', 'Edema', 'Consolidation', 'Pneumonia', 'Atelectasis', 'Pneumothorax', 
               'Pleural Effusion', 'Pleural Other', 'Fracture', 'Support Devices']


# initialize and load the model
pathFileTrain = '../Chexpert/CheXpert-v1.0-small/train.csv'
pathFileValid = '../Chexpert/CheXpert-v1.0-small/valid.csv'


model_path = "model_ones_3epoch_densenet.tar"
myModel = MyModel(model_path, nnClassCount, imgtransCrop)


df = pd.read_csv(pathFileValid)
for i in range(1):
    sample = df.iloc[i]
    input_path = sample["Path"]
    input_path = f"../Chexpert/{input_path}"
    label = myModel.predict_class(input_path)
    print(label)
    print("match? 1 if yes", sample[label])
    myModel.generate(input_path, f"heatmap_{i}", imgtransCrop)
    myModel.visualize_features(input_path, f"features_{i}")
    print()

