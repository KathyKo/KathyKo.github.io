---
title: Python Basic For Everyone
description: Introduction and practice for Basic Python 💻
slug: Python Basic
date: 2024-10-18 00:00:00+0000
image: python basic.png
categories:
    - Python
tags:
    - Python
weight: 1  # You can add weight to some posts to override the default sorting (date descending)
---

Python是非常受歡迎的程式語言，因為容易閱讀和理解，且擁有龐大的開發者社群提供各種函式庫、框架以及教學課程，相對容易學習上手，適合新手入門學習的程式語言。

程式碼的可讀性高，語法接近英文，相較其它的程式語言，例如：C++或Java，Python 指令撰寫較簡潔，可以用更少的程式碼即能達到同樣的結果(當然Java, C都有其存在的必要性)

同時Python應用範圍非常廣泛，也是市場上工作機會需求最大的程式語言之一。

### 有了AI，為何還要學python?
> 在資料分析的過程中，的確有很多工具可以幫助我們進行數據處理、分析和視覺化，
> 甚至透過AI，可以不需要寫程式，只靠指令就能達到目的
> Python作為資料分析領域中最常用的程式語言之一，今天不僅僅是學一個工具，學習過程一種「思考和解決問題的方式」。
> 當你用 Python 進行資料分析時，你實際上是在鍛煉自己的邏輯思維和問題拆解能力。AI 可能能幫你建立模型，但只有人能找出為什麼模型結果不如預期，或者數據處理出現錯誤的根本原因。
> 
> 我們需要的不是更多的工具，而是對數據和邏輯的深入理解，並有能力去拆解問題、排查錯誤，找到解決辦法。
> Python 幫助你透過程式碼來一步一步進行分析、偵錯，這是一個 AI 無法完全取代的過程。
> 
> 我會認為學習 不論是Python或是日後課堂的工具， 並不是為了讓你比 AI 工具更強，而是為了讓你能在面對
> 錯誤、困境時，有能力拆解問題，還有切入問題的方式和工具，找到解決方案💪

### 變數
![](https://i0.wp.com/utrustcorp.com/wp-content/uploads/2023/07/%E8%AE%8A%E6%95%B8%E6%A6%82%E5%BF%B5.png?resize=1024%2C576&ssl=1)
> 1. 程式語言中**等號**的意思是，將等號右邊的值傳給左邊的變數。

> 2. 命名首字需要用英文可搭配數字，基本上命變數還是建議用「 **<font color = red>駝峰式命名</font>**
」，在程式碼閱讀上會較為方便，也可以將不同單字用下底線分開ex:DAC_Class，變數名稱不能出現_以外的符號
> 
> ** 駝峰式命名: 變數名稱由多個單詞組成，第一個單詞的首字母小寫，後面每個單詞的首字母都大寫，這樣名稱就像駱駝的駝峰一樣。e.g.:TotalScore

> **變數命名規則**：
在 Python 中，變數名稱有一些基本規則：
> * 變數名稱可以包含字母、數字和底線（_）。例如：age、student_name
> * 變數名稱不能以數字開頭。例如：2name 是不合格的變數，但 name2 是合格的
> * 變數名稱區分大小寫。例如：Age 和 age 是兩個不同的變數
> * 避免使用 Python 的關鍵字作為變數名稱（例如：if、else、for 等）

![避免使用](1.png)

#### 基礎輸入與輸出
> * 輸出：使用 print() 函數將訊息顯示在執行結果。
  語法：**print(要輸出的內容)**
> * 輸入：使用 input() 函數來讓使用者輸入資料。
  語法：變數 = **input(提示文字)**。 input() 函數會等待使用者輸入資料，並將其存儲在變數中。

```python
print("Hello, World!")
```
Hello, World!

```python
name = input("請輸入你的名字：")
print("你好，" , name)
```
請輸入你的名字：abc

你好，abc


### 資料型態
資料型態大致可以分成三大類，分別是數值型態、字串型態和容器型態。
* 數值型態：int, float, bool
* 字串型態：str, chr
* 容器型態：list, dict, tuple, set


#### **數值資料型態 （Number）**
* 整數（int）：沒有小數點的數字，例如：1、100、-50。
* 浮點數（float）：帶有小數點的數字，例如：3.14、-0.001。
* 布林值(boolean) : 決定邏輯判斷，**True** 或 **False**

```python
# int 整數
x = 1
print(x)
print(type(x))
```
1

<class 'int'>

```python
# int 整數
# float 浮點數
y = 1.5
print(y)
print(type(y))
```
1.5

<class 'float'>
```python
# bool 布林值 True False
a = True
print(a)
print(type(a))
```
True

<class 'bool'>
```python
# 布林值通常是一個運算的結果
a = 1
b = 1
print(a==b)
```
True

其中 a==b 是一個運算結果，會回傳 a 是否等於 b。 因為 a 的值是 1、b的值是 2，所以 a 不會等於 b。 a==b 這個布林值的值就會是 False 。