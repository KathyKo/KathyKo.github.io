---
title: Pandas Basic For Data Analysis
description: Introduction and practice for Python  - Pandas🐼
slug: Pandas Basic
date: 2024-10-25 00:00:00+0000
image: pandas.png
categories:
    - Python
tags:
    - Python
weight: 1  # You can add weight to some posts to override the default sorting (date descending)
---

# **WHAT IS PANDAS**
聽到Pandas時你的反應是什麼? 熊貓?功夫熊貓?粉紅色外送平台?
![pandas?](meme.jpeg)

> Pandas是一個在資料科學領域中非常重要的工具。 類似試算表的概念，是一個專門用來處理結構化數據的 Python 套件，尤其在資料分析上，會頻繁使用它來進行數據操作
> 
> Pandas 的出現是為了填補 Excel 或其他試算表工具的不足。
> 舉例來說，Excel 在處理大型數據集時常常會受到列數限制或處理效率的影響，
> 而 Pandas 則能輕鬆應對數百萬甚至上億行的數據。
> Excel 雖然可以用 VBA 做一些自動化處理，但相較於程式語言，這種自動化的程度較低。
>
> Pandas 不僅能進行靈活的數據操作，還可以和 Python 的其他工具（如 NumPy、scikit-learn、Matplotlib）整合，這使得我們可以進行完整的數據分析流程。

![](1.png)

![](2.png)

**Start Pandas**
會先需要安裝套件，安裝後import pandas 並命名為pd
```python
pip install pandas
import pandas as pd
```
取pandas簡寫pd，但如果要很反骨的用其他方式命名也不是不行啦...
![](5.png)

# **Pandas核心資料結構**
Pandas 的核心結構有Series和DataFrame兩種
![](3.png)

## **Series**
> Series 是 Pandas 中的單維度數據結構，類似於一個帶有標籤的陣列。我們可以把它想像成 Excel 表格中的一列。每個數據值都有對應的索引，就像每個單元格都有標籤一樣。索引可以是數字（比如 0, 1, 2…），也可以是自定義標籤（比如姓名）。可以透過索引來檢索某一個特定的數據。
![](4.png)

創建一個名為 s 的 Series，數據值是 31, 29, 24, 22，對應的索引是 'Anthony', 'Benedict', 'Collin', 'Daphne'。

```python
s = pd.Series([31,29,24,22] , index=['Anthony', 'Benedict', 'Collin', 'Daphne'])
print(s)
```
輸出結果看起來就像是一個標籤和數據的對應關係。

Anthony     31
Benedict    29
Collin      24
Daphne      22
dtype: int64




