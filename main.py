from fastapi import FastAPI
import pandas as pd
from random import randint
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel


# import os
# import numpy as np
# import time
# import sys
# import csv
# import cv2
# import matplotlib.pyplot as plt

# import torch
# import torch.nn as nn
# import torch.backends.cudnn as cudnn
# import torchvision
# import torchvision.transforms as transforms
# import torch.optim as optim
# import torch.nn.functional as tfunc
# from torch.utils.data import Dataset
# from torch.utils.data.dataset import random_split
# from torch.utils.data import DataLoader
# from torch.optim.lr_scheduler import ReduceLROnPlateau
# from PIL import Image
# import torch.nn.functional as func

# import sklearn.metrics as metrics
# import random
# import pandas as pd


app = FastAPI()

origins = [
    "http://localhost:8081",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# diseases: [
#   {
#     text: "No Finding",
#     value: "no_finding"
#   },
#   {
#     text: "Enlarged Cardiomediastinum",
#     value: "enlarged_cardiomediastinum"
#   },
#   {
#     text: "Cardiomegaly",
#     value: "cardiomegaly"
#   },
#   {
#     text: "Lung Lesion",
#     value: "lung_lesion"
#   },
#   {
#     text: "Lung Opacity",
#     value: "lung_opacity"
#   },
#   {
#     text: "Edema",
#     value: "edema"
#   },
#   {
#     text: "Consolidation",
#     value: "consolidation"
#   },
#   {
#     text: "Pneumonia",
#     value: "pneumonia"
#   },
#   {
#     text: "Atelectasis",
#     value: "atelectasis"
#   },
#   {
#     text: "Pneumothorax",
#     value: "pneumothorax"
#   },
#   {
#     text: "Pleural Effusion",
#     value: "pleural_effusion"
#   },
#   {
#     text: "Pleural Other",
#     value: "pleural_other"
#   },
#   {
#     text: "Fracture",
#     value: "fracture"
#   },
#   {
#     text: "Support Devices",
#     value: "support_devices"
#   }
# ]

df = pd.read_csv ('CheXpert-v1.0-small/train.csv')

class Item(BaseModel):
    scan: str
    heatmap: str
    title: str
    age: int 
    sex: str
    answers: list


class Answer(BaseModel):
    id: int
    title: str
    isCorrect: bool

# {
#     name: “shubov”,
#     diseases: [“fracture”, “support_devices”],
#     number: 20,
#     game_mode: ??
# }
class ui_request(BaseModel):
    name: str
    diseases: list
    number: int
    # game_mode: bool

    

@app.get("/")
async def root():
    # df = pd.read_csv ('/home/ui/CheXpert-v1.0-small/train.csv')

    return {"message": "I read the dataset ha"}


@app.get("/items/{item_id}")
async def read_item(item_id: str):
    r = 3
    a = df[df[item_id] == 1].sample(n=r)
    b = df[df[item_id] != 1].sample(n=20-r)

    c = pd.concat([a, b])
    c = c.reset_index()

    i = 0
    c = c.reset_index()  # make sure indexes pair with number of rows
    c = c.fillna(0)

    # s = '{'
    item_list = []
    for index, row in c.iterrows():
        # print(row['c1'], row['c2'])
        item_ = Item(scan=row['Path'], heatmap=row['Path'], title="What is the disease?", age=row['Age'], sex=row['Sex'], answers=[])
        item_list.append(item_)
    
    json_compatible_item_data = jsonable_encoder(item_)

    return JSONResponse(content=json_compatible_item_data)
        # s += 'scan: ' + str(row['Path']) + ', title: "What is the disease?", sex: ' + str(row['Sex'] + ', age: ' + str(row['Age']) + ', answers: [' + '{' + 'id: 1, title: "' + item_id + '", isCorrect: ' + str(bool(row[item_id]))) +'}' + ']' + '}'
    # s += '}'

    return s
    # scan: str
    # title: str
    # age: int 
    # sex: str
    # answers: list

 
# @app.put("/items/{id}")
# def update_item(id: str, item: Item):
#     json_compatible_item_data = jsonable_encoder(item)
#     return JSONResponse(content=json_compatible_item_data)
    
    


# {
#   scan: "@/assets/images/1.jpg",
#   title: "What is the disease?",
#   sex: "Female",
#   age: 23,
#   answers: [
#     {
#       id: 1,
#       title: "Cancer",
#       isCorrect: true,
#     },
#     {
#       id: 2,
#       title: "Diabetes",
#       isCorrect: false,
#     },
#     {
#       id: 3,
#       title: "Hypertension",
#       isCorrect: false,
#     },
#     {
#       id: 4,
#       title: "Asthma",
#       isCorrect: false,
#     },
#   ]
# }


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}
