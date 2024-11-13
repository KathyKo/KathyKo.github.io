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

```
Anthony     31  
Benedict    29  
Collin      24  
Daphne      22  
dtype: int64
```

**常見的 Series 操作**

**選取數據**：可以透過索引名稱或位置來選取數據。比如你可以選取 s['Anthony'] 或 s[0]，兩者都會返回 31。

```python
print(s['Anthony'])     # 選取索引 'Anthony' 的數據，結果為 31
print(s[0])      # 選取第一個數據，結果為 31
```
31  
31

**數據運算**：Series 支援加減乘除等運算，你可以對整個 Series 進行數值運算，Pandas 會自動保留對應的索引。例如，s + 2 會讓每個數據值都加上 2。
> s + 2       每個數據加 2  
> s.median()   計算中位數  
> s.max()        找到最大值  

## **DataFrame**

> DataFrame 是 Pandas 中的二維度數據結構，類似於完整的試算表資料，有欄和列。
>
> 與 Series 不同，DataFrame 可以有多個列，每一列都可以有不同的數據類型。DataFrame 是由行和列組成的，每個行和列都有自己的標籤。
>
> **pd.DataFrame(字典) ，以字典的資料為底，建立dataframe**

![](6.png)

![](7.png)

```python
import pandas as pd

data = { 'Name': ['Anthony', 'Benedict', 'Collin', 'Daphne'],
        'Age': [31,29,24,22],
        'Salary': [75000,72000,60000,54000] }

df = pd.DataFrame(data)
print(df)
```
|       |   Name    | Age | Salary |
|-------|-----------|-----|--------|
|   0   | Anthony   |  31 | 75000  |
|   1   | Benedict  |  29 | 72000  |
|   2   | Collin    |  24 | 60000  |
|   3   | Daphne    |  22 | 54000  |


創建了一個 DataFrame，包含了三個欄位：Name，Age 和 Salary。每一列數據都可以有不同的類型，比如 Age 是整數，而 Name 是字串

要選取 DataFrame 中的數據，我們可以使用列的名稱來選取特定的數據。  
舉個例子：  
我們用 `df['Name']` 選取了 DataFrame 中的 `Name` 列  
這就像是提取 Excel 表中的某一列。你可以選取多列，使用 `df[['Name', 'Salary']]` 選取 

新增一列的方法很簡單，只需要指定列名，然後為每一行賦值  
* 新增列
```python
df['Bonus'] = [5000, 6000, 7000 ,8000]
print(df)
```
|       |   Name    | Age | Salary | Bonus |
|-------|-----------|-----|--------|-------|
|   0   | Anthony   |  31 | 75000  |  5000 |
|   1   | Benedict  |  29 | 72000  |  6000 |
|   2   | Collin    |  24 | 60000  |  7000 |
|   3   | Daphne    |  22 | 54000  |  8000 |


* 新增行資料，使用 pd.concat()
```python
# Pandas 1.4.0 版本之後，append() 方法已被棄用
new_row = pd.DataFrame({
    "Name": ["Ella"],
    "Age": [25],
    "Salary": [64500],
    "Bonus": [1000]
})

df = pd.concat([df, new_row], ignore_index=True) # pd.concat()：將原本的 DataFrame 與新增的資料行結合在一起。ignore_index=True 用於重新索引，使新行的索引從 0 開始連續排列。
print(df)
```
|       |   Name    | Age | Salary | Bonus |
|-------|-----------|-----|--------|-------|
|   0   | Anthony   |  31 | 75000  |  5000 |
|   1   | Benedict  |  29 | 72000  |  6000 |
|   2   | Collin    |  24 | 60000  |  7000 |
|   3   | Daphne    |  22 | 54000  |  8000 |


* 刪除列
```python
df1 = df.drop (columns=['Bonus'] )
print(df1)
```
|       |   Name    | Age | Salary |
|-------|-----------|-----|--------|
|   0   | Anthony   |  31 | 75000  |
|   1   | Benedict  |  29 | 72000  |
|   2   | Collin    |  24 | 60000  |
|   3   | Daphne    |  22 | 54000  |
|   4   | Ella      |  25 | 64500  |
 

基本上不會刪除到原始資料，若要顯示出刪除後的結果，需要宣告新變數來存取執行結果

![Series與DataFrame比較](8.png)

# **資料集實戰練功**

## **匯入實戰資料**

*出來吧 神奇寶貝!*
![](https://static0.gamerantimages.com/wordpress/wp-content/uploads/Pokemon-banner.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5)

[Pokemon DataSet](https://www.kaggle.com/datasets/rounakbanik/pokemon)

**匯入資料**
* pd.read_csv()：用來匯入 CSV 格式的資料
* pd.read_excel()：用來匯入 Excel 格式的資料

```python
import pandas as pd
df = pd.read_csv("檔案路徑")
```

## **檢索資料**

* **df.info()**：顯示 DataFrame 的基本資訊，包括列數、欄數和每個欄位的數據類型，查看資料的資訊，包括欄位、數據型態、缺失值等
* **df.head()**：取得最前面的n筆資料
* **df.tail()**：取得最後面的n筆資料
* **df.column**：列出欄位名稱
* **df.describe()**：產生統計摘要，如平均值、最大值、標準差等。
* **df.shape**：返回資料的行數與列數，了解資料的大小

```python
df.info()
```

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 800 entries, 0 to 799
Data columns (total 13 columns):
 #   Column      Non-Null Count  Dtype 
---  ------      --------------  ----- 
 0   #           800 non-null    int64 
 1   Name        800 non-null    object
 2   Type 1      800 non-null    object
 3   Type 2      414 non-null    object
 4   Total       800 non-null    int64 
 5   HP          800 non-null    int64 
 6   Attack      800 non-null    int64 
 7   Defense     800 non-null    int64 
 8   Sp. Atk     800 non-null    int64 
 9   Sp. Def     800 non-null    int64 
 10  Speed       800 non-null    int64 
 11  Generation  800 non-null    int64 
 12  Legendary   800 non-null    bool  
dtypes: bool(1), int64(9), object(3)
memory usage: 75.9+ KB
```

```python
print(df.describe())
```

```
                #      Total          HP      Attack     Defense     Sp. Atk  \
count  800.000000  800.00000  800.000000  800.000000  800.000000  800.000000   
mean   362.813750  435.10250   69.258750   79.001250   73.842500   72.820000   
std    208.343798  119.96304   25.534669   32.457366   31.183501   32.722294   
min      1.000000  180.00000    1.000000    5.000000    5.000000   10.000000   
25%    184.750000  330.00000   50.000000   55.000000   50.000000   49.750000   
50%    364.500000  450.00000   65.000000   75.000000   70.000000   65.000000   
75%    539.250000  515.00000   80.000000  100.000000   90.000000   95.000000   
max    721.000000  780.00000  255.000000  190.000000  230.000000  194.000000   

          Sp. Def       Speed  Generation  
count  800.000000  800.000000   800.00000  
mean    71.902500   68.277500     3.32375  
std     27.828916   29.060474     1.66129  
min     20.000000    5.000000     1.00000  
25%     50.000000   45.000000     2.00000  
50%     70.000000   65.000000     3.00000  
75%     90.000000   90.000000     5.00000  
max    230.000000  180.000000     6.00000
```

```python
#檢視欄位
print(df.columns)
```

```
Index(['#', 'Name', 'Type 1', 'Type 2', 'Total', 'HP', 'Attack', 'Defense',
       'Sp. Atk', 'Sp. Def', 'Speed', 'Generation', 'Legendary'],
      dtype='object')
```

```python
#檢視前10筆資料
df.head(n=10)
```

### **檢視單個欄位資料**
查看某個特定欄位（例如 Name 或 Type 1）的所有值

```python
# 查看 'Name' 欄位的所有資料
print(df['Name'])
```

```
0                  Bulbasaur
1                    Ivysaur
2                   Venusaur
3      VenusaurMega Venusaur
4                 Charmander
               ...          
795                  Diancie
796      DiancieMega Diancie
797      HoopaHoopa Confined
798       HoopaHoopa Unbound
799                Volcanion
Name: Name, Length: 800, dtype: object
```

```python
# 查看 'Type 1' 欄位的所有資料
print(df['Type 1'])
```

```
0        Grass
1        Grass
2        Grass
3        Grass
4         Fire
        ...   
795       Rock
796       Rock
797    Psychic
798    Psychic
799       Fire
Name: Type 1, Length: 800, dtype: object
```

### **檢視單個欄位資料**
可以同時查看多個欄位，選取數個你感興趣的欄位作為子集

```python
# 查看多個欄位的資料
print(df[['Name', 'HP', 'Attack']])
```

```
                      Name  HP  Attack
0                Bulbasaur  45      49
1                  Ivysaur  60      62
2                 Venusaur  80      82
3    VenusaurMega Venusaur  80     100
4               Charmander  39      52
..                     ...  ..     ...
795                Diancie  50     100
796    DiancieMega Diancie  50     160
797    HoopaHoopa Confined  80     110
798     HoopaHoopa Unbound  80     160
799              Volcanion  80     110

[800 rows x 3 columns]
```
### **檢視單個欄位資料**
可以透過行號來檢視某一特定行的所有資料

```python
# 查看第 15 行的所有資料
print(df.iloc[15])
```

```
#                     12
Name          Butterfree
Type 1               Bug
Type 2            Flying
Total                395
HP                    60
Attack                45
Defense               50
Sp. Atk               90
Sp. Def               80
Speed                 70
Generation             1
Legendary          False
Name: 15, dtype: object
```


```python
# 查看指定範圍的行
print(df.iloc[0:5])  # 顯示第 0 到第 4 行
```

```
   #                   Name Type 1  Type 2  Total  HP  Attack  Defense  \
0  1              Bulbasaur  Grass  Poison    318  45      49       49   
1  2                Ivysaur  Grass  Poison    405  60      62       63   
2  3               Venusaur  Grass  Poison    525  80      82       83   
3  3  VenusaurMega Venusaur  Grass  Poison    625  80     100      123   
4  4             Charmander   Fire     NaN    309  39      52       43   

   Sp. Atk  Sp. Def  Speed  Generation  Legendary  
0       65       65     45           1      False  
1       80       80     60           1      False  
2      100      100     80           1      False  
3      122      120     80           1      False  
4       60       50     65           1      False  
```

### **根據條件篩選資料（查看子集）**
可以根據某個欄位的值來篩選符合條件的行，例如查看所有屬性為 "Legendary" 的 Pokémon

```python

df[df['Legendary']==True].head(15)  #Showing the legendary pokemons
```

### **查看特定欄位的統計資訊**
除了 df.describe()，也可以對單個欄位執行統計操作，如查看 Attack 欄位的平均值、最大值等

```python
# 計算 'Attack' 欄位的平均值
print(df['Attack'].mean())

# 查看 'Defense' 欄位的最大值
print(df['Defense'].max())
```
79.00125  
230


### **檢視唯一值**
查看某個欄位中有哪些唯一值，這對於分類資料（如 Type 2）有幫助

```python
# 查看 'Type 2' 欄位的所有唯一值

type2_unique = df['Type 2'].unique()
print(type2_unique)
```
['Poison' nan 'Flying' 'Dragon' 'Ground' 'Fairy' 'Grass' 'Fighting'
 'Psychic' 'Steel' 'Ice' 'Rock' 'Dark' 'Water' 'Electric' 'Fire' 'Ghost'
 'Bug' 'Normal']

 
### **計算每個分類的出現頻率**
可以計算每個分類（如 Type 1）在資料集中出現的頻率

```python
# 計算 'Type 1' 每個分類的出現次數

type1_counts = df['Type 1'].value_counts()
print(type1_counts)
```

```
type1_counts = df['Type 1'].value_counts()
print(type1_counts)
Type 1
Water       112
Normal       98
Grass        70
Bug          69
Psychic      57
Fire         52
Electric     44
Rock         44
Dragon       32
Ground       32
Ghost        32
Dark         31
Poison       28
Steel        27
Fighting     27
Ice          24
Fairy        17
Flying        4
Name: count, dtype: int64
```

### **檢視資料摘要（groupby）**
想查看特定分類的統計摘要，可以使用 **groupby()** 來進行分組總結

```python
# 按 'Type 1' 分組，並查看每個屬性的平均攻擊力

grouped_data = df.groupby('Type 1')['Attack'].mean()
print(grouped_data)
```

```
Type 1
Bug          70.971014
Dark         88.387097
Dragon      112.125000
Electric     69.090909
Fairy        61.529412
Fighting     96.777778
Fire         84.769231
Flying       78.750000
Ghost        73.781250
Grass        73.214286
Ground       95.750000
Ice          72.750000
Normal       73.469388
Poison       74.678571
Psychic      71.456140
Rock         92.863636
Steel        92.703704
Water        74.151786
Name: Attack, dtype: float64
```


## **清理資料（Cleaning DataFrame）**

* **df.isnull().sum()**：檢查資料集中每個欄位有多少缺失值，幫助找出需要清理的部分
* **df.dropna()**：刪除包含缺失值的行，適用於缺失數據較少的情況
* **df.fillna(0)**：將缺失值以指定的數值（如 0）填充，適用於缺失值較多且無法刪除的情況
* **df.duplicated().sum()**：檢查是否有重複的資料行，避免數據重複影響分析結果
* **df.drop_duplicates()**：刪除所有重複行，保留唯一的數據

```python
# 檢查是否有缺失值
print(df.isnull().sum())
```

```
#               0
Name            0
Type 1          0
Type 2        386
Total           0
HP              0
Attack          0
Defense         0
Sp. Atk         0
Sp. Def         0
Speed           0
Generation      0
Legendary       0
dtype: int64
```

### **刪除包含缺失值的行**
如果缺失的資料很關鍵且無法推測，可以直接刪除這些包含缺失值的行


```python
# 刪除包含缺失值的行
# 這樣會刪除 Type 2 欄位中缺失值的行，並留下屬性完整的資料

df_cleaned = df.dropna(subset=['Type 2'])
print(df_cleaned.info())
```

```
<class 'pandas.core.frame.DataFrame'>
Index: 414 entries, 0 to 799
Data columns (total 13 columns):
 #   Column      Non-Null Count  Dtype 
---  ------      --------------  ----- 
 0   #           414 non-null    int64 
 1   Name        414 non-null    object
 2   Type 1      414 non-null    object
 3   Type 2      414 non-null    object
 4   Total       414 non-null    int64 
 5   HP          414 non-null    int64 
 6   Attack      414 non-null    int64 
 7   Defense     414 non-null    int64 
 8   Sp. Atk     414 non-null    int64 
 9   Sp. Def     414 non-null    int64 
 10  Speed       414 non-null    int64 
 11  Generation  414 non-null    int64 
 12  Legendary   414 non-null    bool  
dtypes: bool(1), int64(9), object(3)
memory usage: 42.5+ KB
None
```

### **用特定值填充缺失值**
若想保留所有的資料，可以用一個合適的值來填充缺失的部分。  
例如，填充為 'None' 表示這些 Pokémon 沒有第二屬性

```python
# 使用 'None' 填充缺失的 Type 2 資料
# 可以保留所有的行，並以 'None' 來表示無第二屬性的 Pokémon

df_filled = df.fillna({'Type 2': 'None'})
print(df_filled.head())
```

```
#                   Name Type 1  Type 2  Total  HP  Attack  Defense  \
0  1              Bulbasaur  Grass  Poison    318  45      49       49   
1  2                Ivysaur  Grass  Poison    405  60      62       63   
2  3               Venusaur  Grass  Poison    525  80      82       83   
3  3  VenusaurMega Venusaur  Grass  Poison    625  80     100      123   
4  4             Charmander   Fire    None    309  39      52       43   

   Sp. Atk  Sp. Def  Speed  Generation  Legendary  
0       65       65     45           1      False  
1       80       80     60           1      False  
2      100      100     80           1      False  
3      122      120     80           1      False  
4       60       50     65           1      False  
```

### **使用最常見的值進行填充**
如果認為缺失值應該是某個常見的屬性，也可以用該屬性的名稱來填充。例如，填充為最常見的 Type 2 值。

```python
# 使用 'Type 2' 欄位的最常見值進行填充
most_common_type2 = df['Type 2'].mode()[0]
df_filled = df.fillna({'Type 2': most_common_type2})
print(df_filled.head())
```

### **保留缺失值並進行標記**
如果希望保留缺失值，同時也想標記出哪些行有缺失的 Type 2，可以新增一個標記欄位。

```python
df['Type 2 Missing'] = df['Type 2'].isnull()
print(df[['Name', 'Type 2', 'Type 2 Missing']].head())
```

```
                    Name  Type 2  Type 2 Missing
0              Bulbasaur  Poison           False
1                Ivysaur  Poison           False
2               Venusaur  Poison           False
3  VenusaurMega Venusaur  Poison           False
4             Charmander     NaN            True
```

### **檢查重複值 - df.duplicated().sum()**

```python
num_duplicates = df.duplicated().sum()
print(f"重複行數：{num_duplicates}")
```
重複行數：0

## **篩選資料（Filtering DataFrame）**

* **單一條件篩選**：df[df['欄位'] > 某值]
* **多重條件篩選**：df[(df['欄位1'] > 某值) & (df['欄位2'] < 某值)]
* **文字篩選**：df[df['欄位'] == '某文字'] 或使用 isin()、str.contains()
* **篩選區間**：df[df['欄位'].between(開始值, 結束值)]
* **篩選缺失值**：df[df['欄位'].isnull()] 或 notnull()
* **篩選前 N%**：使用 quantile() 來篩選資料的百分比