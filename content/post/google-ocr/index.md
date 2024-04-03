---
title: Google OCR
description: Introduction and implementation of the Google Cloud Document AI API and the Google Cloud Vision API.
slug: Test
date: 2023-10-02 00:00:00+0000
image: cover.jpg
categories:
    - AI
tags:
    - AI
    - OCR
weight: 1       # You can add weight to some posts to override the default sorting (date descending)
---

### Introduction

Google Cloud Document AI API and Google Cloud Vision API are both Google Cloud services designed for processing documents and images.


#### 1.Document Processing:

> * Document AI API:  
> Document AI API focuses on processing structured documents, such as PDFs and OCR 
> documents. Its primary functionalities include text extraction, table recognition
> page identification, entity recognition (e.g., identifying dates and amounts in 
> contracts), and more. This makes it suitable for handling business documents like
> contracts, invoices, reports, and others.

> * Vision API:
> Vision API specializes in processing images and pictures. It can recognize 
> objects, faces, scenes, text, and more within images. Its main applications 
> include image classification, facial recognition, OCR text recognition, and more.
> This makes it suitable for image processing applications like image search, facial
> recognition, and automated image analysis.
 
#### 2.Application Scenario:
> * Document AI API: 
> The Document AI API is suitable for business scenarios that involve processing a 
> large volume of structured documents, such as contracts, invoices, and medical 
> records.

> * Vision API: 
> The Vision API is well-suited for applications that require processing images and
> photos, such as image analysis and image search.


### Code Demo

#####  Cloud Vision
*  Recognize text in pictures
```python
#Detect online images
from google.cloud import vision
def detect_document_text_uri(uri):
    """Detects document text in the file located in Google Cloud Storage or on the Web."""
    client = vision.ImageAnnotatorClient()
    image = vision.Image()
    image.source.image_uri = uri

    response = client.document_text_detection(image=image)
    document = response.full_text_annotation
    
    print(document.text)

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )

detect_document_text_uri('https://i.redd.it/2aby2h2mhtpb1.jpg')
```

```python
#Detect local images
def detect_text(path):
    """Detects text in the file."""
    from google.cloud import vision

    client = vision.ImageAnnotatorClient()

    with open(path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    
    if texts:
        print(texts[0].description)

detect_text("profile path")
```

Click ▶ to expand the examples

<details open>
<summary>Example & Result (online images)</summary>

![Image 1](1.jpg) ![Image 2](2.jpg)

</details>

<details open>
<summary>Example & Result (local images)</summary>

![Image 3](3.jpg) ![Image 4](4.jpg)

</details>