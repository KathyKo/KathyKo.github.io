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

程式碼的可讀性高，語法接近英文，相較其它的程式語言，例如：C++或Java，Python 指令撰寫較簡潔，可以用更少的程式碼即能達到同樣的結果  
(當然Java, C都有其存在的必要性)

同時Python應用範圍非常廣泛，也是市場上工作機會需求最大的程式語言之一。

# Python 自學免費資源
> * Python 官方文檔 
> * ‍Learn Python：給非技術背景初學者入門的網站
> * DataCamp：側重於數據科學的Python教學
> * FreeCodecamp：4小時的英文初學者教程，有中文字幕
> * Google：Google’s Python Class
> * IBM：Python for Data Science, AI & Development
> * Youtube影片

# 有了AI，為何還要學python?
> 在資料分析的過程中，的確有很多工具可以幫助我們進行數據處理、分析和視覺化，
> 甚至透過AI，可以不需要寫程式，只靠指令就能達到目的
> Python作為資料分析領域中最常用的程式語言之一，今天不僅僅是學一個工具，學習過程一種**「思考和解決問題的方式」**。
> 當你用 Python 進行資料分析時，實際上是在鍛煉自己的邏輯思維和問題拆解能力。AI 可能能幫你建立模型，但只有人能找出為什麼模型結果不如預期，或者數據處理出現錯誤的根本原因。
> 
> 我們需要的不是更多的工具，而是對數據和邏輯的深入理解，並有能力去拆解問題、排查錯誤，找到解決辦法。
> Python 幫助你透過程式碼來一步一步進行分析、偵錯，這是一個 AI 無法完全取代的過程。
> 
> 我會認為學習不論是Python或是其他的工具， 並不是為了讓你比 AI 工具更強，而是為了讓你能在面對
> 錯誤、困境時，有能力拆解問題，還有切入問題的方式和工具，找到解決方案💪


# 變數
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

# 基礎輸入與輸出
> * 輸出：使用 print() 函數將訊息顯示在執行結果。
> 
>   語法：**print(要輸出的內容)**
> * 輸入：使用 input() 函數來讓使用者輸入資料。
> 
>   語法：變數 = **input(提示文字)**。 input() 函數會等待使用者輸入資料，並將其存儲在變數中。

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


# 資料型態
資料型態大致可以分成三大類，分別是數值型態、字串型態和容器型態。
* 數值型態：int, float, bool
* 字串型態：str, chr
* 容器型態：list, dict, tuple, set


## **數值資料型態 （Number）**
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

### **字串/字元資料型態 String/Character Data Types**
#### **1. 字串 string (str)**
字串資料是以單引號 (')或雙引號(")所包起來的文字資料，由一連串字元所組成。
使用單引號或是雙引號的時機沒有一定， 若是字串中本身就包含單引號或是雙引號，就可以使用另一種引號以利區別。
```python
# 布林值通常是一個運算的結果
song = 'Just the way you are'
print(song)
print(type(song))
```
Just the way you are
<class 'str'>

```python
print(" "Espresso" is a song by Sabrina Carpenter.")
```
SyntaxError: invalid syntax
其中把“Espresso”這首歌括號起來，會使 Python 認為要印出的字串為 “ “(空字串)、以及” is a song by Sabrina Carpenter.”，因而出現error。

```python
print('"Espresso" is a song by Sabrina Carpenter.')
```
"Espresso" is a song by Sabrina Carpenter.

#### **字串的處理**
1. 字串相加
```python
str1 = "Girl, you're amazing."
str2 = "Just the way you are"
print(str1 + str2)
```
Girl, you're amazing.Just the way you are

2. 重複印出字串

輸入字串與 * 再加上想要重複印出的字串即可
```python
str = "Hello"
print(str*5)
```

3. 計算字串長度

利用 len() 這個函式會回傳字串的長度
```python
str = "asdfghjklzxcvbnmqwertyuiop"
print(str)
print(len(str))
```
4. 取得字串中的某個字符
```python
word = "Python"
print(word[0])  # 第一個字元
print(word[-1])  # 最後一個字元
```
P  
H
#### **2. 字元 character (chr)**
字元就是組成字串的元素。 例如在字串 Python 中，   
'p', 'y', 't', 'h', 'o', 'n' 每個字母都是一個字元。

##### **型態轉換**
![型態轉換關係](https://i0.wp.com/utrustcorp.com/wp-content/uploads/2023/07/%E5%9E%8B%E6%85%8B%E8%BD%89%E6%8F%9B.png?resize=1024%2C578&ssl=1)

```python
# 整數轉換成浮點數
num_int = 209
num_float = float(num_int)
print(num_float)
print(type(num_float))
```
209.0  
<class 'float'>

```python
# 浮點數轉換成整數（會捨棄小數部分）
num_float = 3.1415926
num_int = int(num_float)
print(num_int)
```
3

```python
# 字串轉換成整數或浮點數
string_1 = "103"
num_int = int(string_1)
num_float = float(string_1)
print(num_int)
```
103

```python
# 布林值轉換成整數（True 為 1，False 為 0）
bool_value = False
num_int = int(bool_value)
print(num_int)
```
0

##### **Print的參數格式化**
在 Python 中，我們有時需要更靈活地控制輸出的內容，讓數字、字串等資料顯示得更符合我們的需求。  
這時候可以使用 % 進行字串格式化，這種方法就像填空題一樣，把變數的值放進我們設定的格式裡面。

![](2.png)
```python
 # %%：顯示「%」
percentage = "顯示百分比符號：%%" % ()
print(percentage)

# %d：整數輸出
age = 25
print("我今年 %d 歲。" % age)

# %f：浮點數輸出
pi = 3.14159
print("圓周率的近似值是：%f" % pi)

# %s：字串輸出
name = "Alice"
print("你好，%s！" % name)

# %e：科學記號法輸出
large_number = 123456789
print("科學記號法表示：%e" % large_number)
```
顯示百分比符號：%  
我今年 25 歲。  
圓周率的近似值是：3.141590  
你好，Alice！  
科學記號法表示：1.234568e+08

## **容器型態(Container Datatypes)**
Python 的容器型態，也就是能夠用來存放多個資料的結構。  
這些結構讓我們可以更方便地組織和管理大量的數據。主要有四種常見容器型態：  
* List(串列)
* Tuple(元組)
* Set(集合)
* Dictionary(字典)

### **List(列表)**
* list是一個值可變、可重複、存放**有順序性**的資料結構。使用 [ ] 表示
* index從0開始。列表中的元素可以被修改、添加或刪除

> 列表可以儲存很多不同的東西，像是數字、字串，甚至是其他列表。
> 
> 它的特點是有順序，也就是說，可以依據編號（索引）來取出列表中每個元素。
> 
> 索引從 0 開始，意味著列表的第一個元素索引是 0，第二個是 1，以此類推。

```python
# 布林值轉換成整數（True 為 1，False 為 0）
student_name = ["Amy", "Bill", "Cony"]
student_score = [100, 90, 80]

print(student_name[2])
print(student_score[0])
```
Cony  
100

#### **新增/刪除/修改list的值**
* append：從List尾端新增一個元素
* insert：在List的任何位置插入元素
* remove: 將List中某個數值刪除
* pop(): 將List尾端的元素刪除
* del: 將List該位置的值刪除

建立一個List
```python
animals = ["bear", "cat", "dog", "elephant"]
```

```python
animals.append("fox") #新增一個元素"fox"
print(animals)
```
['bear', 'cat', 'dog', 'elephant', 'fox']

```python
animals.pop() #括號內不需放值，會自動刪除最後一個
print(animals)
```
['bear', 'cat', 'dog', 'elephant']

```python
animals.insert(2,"panda") #List的第二個元素在"cat"插入後變成"panda"
print(animals)
```
['bear', 'panda', 'bird', 'cat', 'dog', 'elephant']

```python
animals.remove("dog") # 刪除"dog"
print(animals)
```
['bear', 'bird', 'bird', 'cat', 'elephant']

#### **取得長度**
使用 **len(list)**
```python
student = ['Amy', 'Bill', 'Cony', 'Dora', "Ellie"]
print(len(student))
```
5

#### **常用位置函數**
* sort()：List排序
* reverse()：反轉List的順序
* index()：某值在List第一次出現的索引位置
* count()：某值在List出現的次數

建立兩個list
```python
animals = ['bear', 'cat', 'dog', 'elephant', 'cat']
num = [21, 32, 43, 54, 65, 23, 34, 35]
```

```python
#在sort中可以加入reverse參數調整升降(默認是升序)
#reverse = True 降序， reverse = False 升序
#都沒打就是默認reverse = False

animals.sort() #排序方法按照字母順序
num.sort()     #數字會按照數字小到大

print(animals)
print(num)

animals.sort(reverse = True) #排序方法按照字母順序
num.sort(reverse = True)

print(animals)
print(num)
```
['bear', 'cat', 'cat', 'dog', 'elephant']  
[21, 23, 32, 34, 35, 43, 54, 65]  
['elephant', 'dog', 'cat', 'cat', 'bear']  
[65, 54, 43, 35, 34, 32, 23, 21]  

```python
animals = ['bear', 'cat', 'dog', 'elephant', 'cat', "Cat"]
print(animals.count('cat')) #cat總共出現幾次
```
2  
cat和Cat為不同元素

### Tuple(元組)
Tuple是一個值不可變、可重複、存放有順序性的資料結構。⭢ **給定元素後不能改變**  
使用 ( ) 表示

```python
animals = ('bear', 'cat', 'dog', 'elephant', 'cat')
print(animals)
print(animals[1])
```
('bear', 'cat', 'dog', 'elephant', 'cat')  
cat

```python
animals[0] = "peoele"
```
TypeError: 'tuple' object does not support item assignment  
建立了一個名為 animals 的tuple，和list一樣可以用索引取值，但是不能像list一樣去改變內容。如果嘗試更改tuple的值，會報錯。

