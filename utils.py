import pandas as pd
import random

LABELS = ['No Finding',
       'Enlarged Cardiomediastinum', 'Cardiomegaly', 'Lung Opacity',
       'Lung Lesion', 'Edema', 'Consolidation', 'Pneumonia', 'Atelectasis',
       'Pneumothorax', 'Pleural Effusion', 'Pleural Other', 'Fracture',
       'Support Devices']

df = pd.read_csv("static/CheXpert-v1.0-small/train.csv")
num_samples = len(df)

def get_random_sample():
    x = random.randint(0, num_samples)
    return x, df.iloc[x]

def get_correct_answer(sample_number):
    # use AI to predict correct answer or show true label
    sample = df.iloc[sample_number]
    return