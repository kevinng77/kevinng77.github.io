---
title: 嵌入式学习之（四）|C++ primer
date: 2020-10-13
author: Kevin 吴嘉文
keywords: 
language: cn
categories:
- Notes|理论梳理
tags:
- 计算机语言
- 嵌入式学习
mathjax: true
toc: true
comments: 

---

# C++ primer 笔记

> 嵌入式自学开始啦~ 为了自己的贾维斯
>
> 笔记总结于 《c++ primer》

<!-- more-->

## 第二章

+ 用double通常比float好
+ 无符号的变量应注意：循环中的问题，负值取模（如unsigned int模 2^32，即8字节）
+ 八进制  `int month = 09` 报错  

+ 初始化列表时丢失数据会报错：`int i = {3.14} //错`
+ `double salary = wage = 999.99` 只对salary定义，如果wage已定义就不会报错
+ 使用未初始化的变量难调试，建议初始化每一个内置类型变量
+ 变量小写字母开头，类大写开头，单词间有区分（如one_two或oneTwo）
+ 一个变量的周期从声明开始到作用域末端结束

### 引用，指针

+ 引用初始化必须是一个对象，对象与引用类型要匹配
+ 指针类型与对象也要匹配，指针使用前（取值）必须初始化

+ 空指针 `int p1 = nullptr; //等价于 0 或者 NULL`

+ 指针可变指向对象，可赋值，可不初始化定义。引用反之。

### const

+ const必须初始化
+ 多个文件中要使用同一个const时，用extern声明。`extern const int bufSize;`
+ `double dval = 3.14；const int &ri = dval；` 用const引用时要保持类型一致，否则此处引用不会绑定到dval上。而是绑定临时变量 `const int temp = 3; `

+ `const int &r2 = i; `不能通过r2更改i的值

+ 指向常量的指针: `const double *cptr = &pi; ` 此处可以指向常量，也可以指向非常量，但是都不能通过该指针改变这个地址上的值。
+ 常量指针：`int i = 0; int *const curErr = i;` 不能改变指针指向的值
+ 常量与常量指针需初始化
+ 顶层const：不能改变变量的值
+ 底层const：不能改变指向的值，可以改变指向对象（底似内在，内在即价值）
+ 拷贝时需考虑底层const，可以无视顶层const
+ Q: 对于下面的语句，请说明对象被声明为顶层const还是底层const。

```c++
（1） const int v2 = 0; int v1 = v2;          // v2是顶层const
（2） int *p1 = &v1, &r1 = v1;                // 非const
（3） const int *p2 = &v2, *const p3 = &i, &r2 = v2;  // p2是底层const，p3最左是底层，p3前面是顶层const， r2是底层const。
```

+ Q: 假设上题中的变量已定义，判断下面语句哪些合法。

```c++
（1） r1 = v2;        // 合法，引用改变值
（2） p1 = p2; p2 = p1;   // 不合法，p2是底层const，赋值对象必须同样有底层const才行，p2 = p1合法
（3） p1 = p3; p2 = p3;   // 不合法，p3是底层const， p2 = p3合法。
```

### constexpr

+ `constexpr int mf = 20;` 声明为constexpr类型，由编译器来验证变量的值是否为常量表达式

 ### auto类型

+ `auto item = val1 + val2` val1 和 val2 必须有初始值，且类型必须相同。
+ auto 忽略顶层const，保留底层const
+ `const int i = 42; const auto j2 = i, &k2 - i;` auto  后定义的多个对象应类型一致。

### decltype

+ ` decltype((b)) d = a;       // d为int& 类型，是a的引用`
+  赋值是会产生引用的一类典型表达式，引用的类型就是左值的类型。也就是说，如果i是int，则表达式i=x的类型是int&。根据该特点指出下面变量的类型。
`int a = 3, b = 4; decltype (a = b) d = a; // d为int&，是a的引用。`

### struct 

+ ；

### 头文件

+ 包含只能被定义一次的实体如const， constexpr等

## 第三章

### 字符串

+ `getline(is,s)`从is读取1行给s，返回is。s中不包含换行符
+ string的相加中，必须至少有一个对象时string类型。字符串与string不是同类型

![image-20201230134741067](/img/C++primer/image-20201230134741067.png)

+ `string str("string"); for (auto c:str){ cout <<c<<endl;}`

+ `string str("string"); for (auto &c:str){ c = toupper(c);} cout << str<<endl;`  善用引用改变原string

+ `const string s = "keep out"; for (auto &c :s){}` 其中不能通过c改变s。

+ string 比使用C中的字符串运算`strcpy(),strcat(),strcat()` 

+ `const char *str = s.c_str();` 用string 的c_str函数来初始化，最好做一份该数组的拷贝，如果程序需要一直用这个C风格的字符串

+ 与数字转换：


```c++
#include<cstdlib>
#include<string>
std::to_string(digit)
std::stoi() //stol对long，stoll - longlong
```

+ 切片操作：`string.substr(bed, end)`

### 容器

### vector

+ `empty(),size(),push_back(),[],=v,={},==,front(),back(),pop_back(),clear()`
+ 使用 [] 超出范围时，编译器不会发现
+ `vector<string> ivec( 10 );` 和 `vector<string> ivec{10};` 输出一样
+ `for (auto &c : ivec) ` 
+ ​        `auto result = max_element(nums.begin(), nums.end()-k+1);`  返回 result 为地址 `vector (result,result+k);`

### 迭代器

+ `string::iterator it2;` 
+ 指向同一容器的迭代器才能执行相减
+ 二分法好例子：迭代器的运算和操作

```c++
	vector<int>::iterator beg = v.begin();
	vector<int>::iterator end = v.end();
	vector<int>::iterator mid = beg + (end - beg) / 2;

	int target = 3;
	while (mid != end && *mid != target)
	{
		if (target > * mid)
		{beg = mid + 1;}
		else
		{end = mid;}
		mid = beg + (end - beg) / 2;
	}
```

### 数组

+ 用常量表达式初始化。不能赋值或用于拷贝初始化
+ `int (*Parray){10} = &arr;`  指向有10个整数的数组
+ `int (&arrRef)[10] = arr ` 引用一个有10个整数的数组
+ `int *(&arry)[10] = ptrs` 数组的引用
+ `vector<int> subVec(int_arr + 1, int_arr + 4);` 数组初始化vector只需要指明拷贝区域的首元素地址

### 指针和数组

+ `int ia[] = {0,1,2,3}; auto ia2(ia);` ia2 是整形指针
+ 指针也可以作为迭代器使用，如 `int *beg = begin(ia)` `int last = end(ia)`

### 其他

```c++
typedef pair<int, vector<int>> pp;
pp p1; // 可赋值 pp.first=1, pp.second 调用

priority_queue<pp, vector<pp>, greater<pp> > store; //升序队列 #include <queue> 
// .top() 访问头元素。 .pop() 头元素 .push(xx) 

while (store.empty()){}

```

hash集合

```c++
#include <unordered_set>
unordered_set<int> hashset;
hashset.insert(11);
hashset.erase(11);
hashset.count(11); // 判断是否在集合中，否返回-1；
```



## 第四章

+ ++a可以使用时，不用a++
+ 再便利迭代器中，使用 `cout << *iter++ << endl;`

+ `string p = s + (s[s.size() - 1] == 's' ? "" : "s"); ` 条件运算符优先级较低，条件运算符的嵌套不要超过3层，不然可读性很差。

### 

+ `quiz1 |= 1UL << 27` 在quiz中更新27号同学没通过（为0）的信息，反之用`quiz1 &= ~(1UL <<27)` 



+ `someValue ? ++x,++y:--x,--y` 不论条件如何都会执行 `--y`；

## 第五章

+ 悬垂else (dangling else)
+ 若省略switch分支后的break，请加上程序的逻辑注释
+ switch后定义default标签也是有用的，即使什么都不做时。
+ 范围for语句：`for (auto &r:v)` 

+ 必须时刻清楚异常何时发生，异常发生后程序应如何确保对象有效，资源无泄漏，程序处于合理状态等。

## 第六章

+ 形参，局部变量，局部静态变量

+ `int my_fact(){static int cnt = 0;	return cnt++;}` 局部静态变量例：第一次调用返回0，以后每次调用返回值加1。

+ 头文件声明函数`void myfun1();` ,main.cpp中`#include "头文件.h"`，在fun.cpp中定义函数`#include "头文件.h"; void myfun1(){return;}`

+ 用函数改变外部变量的值，在c++中传递引用代替传递指针，数值交换为例

```c++
void swap(int& a, int& b) {
	int temp = b;
	b = a;
	a = temp;
}
```

+ 如果函数无需改变引用形参的值，最好将其声明为常量引用。应注意函数在某些定义后是否只接受普通引用。

### 传递数组

+ 用传入char 类型，空字符表示数组结束 `void print(const char *cp){uf (cp) {while (*cp)}}`
+ 传入开头和结尾的位置 `void print(const int *beg, const int *end){while (beg != end){cout<< *beg++<<endl;}}`
+ 传入开头和数组大小 `void print(const int ia[],size_t size)`
+ 传入固定长度的数组 `void print( const int (&a)[10])` ,输入长度不正确的数组则报错。如果用`void print( const int a[10])` 在输入数组不为10的情况下会输出错误信息。

 

+ 向main函数传递参数：`prog -d -o ofile data0` 

+ 函数的实参数量未知但是类型相同，可使用 initializer_list。如 `void error_msg(initializer_list<string> il){}`

+ 省略符形参仅仅用于C和C++通用的类型，大多数类型的对象在传递给省略符时都无法正确拷贝。

+ 当循环控制变量时基本类型时，可不声明为引用。否则将循环控制变量声明称引用类型避免拷贝

+ 在含有return语句的循环后面应该也有一条return语句。
+ 不要返回局部变量的引用或者指针
+ main返回0可以表示为执行成功

+ 函数返回引用，`int &get(int *array,int index){return arry[index]}`

### 返回数组指针

+ 例二为：返回数组的引用，该数组包含10个string对象。

+ 类型别名`typedif int arrT[10]; using arrT = int[10]; arrT* func(int i);` `using arrStr = string[10]; arrStr& func( arrStr& arr_str );`
+ `int (*func(int i))[10]` `string(&str(void)[10]`
+ 尾置返回类型，`auto func(int i) -> int(*)[10]; ` `auto func (string (&str)[10] ) -> string(&)[10];`
+ 用decltype`int odd[] = {1,3,5}; decltype(odd) *arrPtr(int i){return &odd;}` `string str[10]; decltype(str) &func ( decltype(str)& );`

### 函数重载

+ const_cast 和重载

```c++
string &shorterString(string &s1,string &s2){ 
auto &r = shorterString(const_cast<const string&>(s1),const_cast<const string&>(s2)); return const_cast<string&>(r); }
```

原shorterstring函数的形参为常量引用类型，用const_cast重载函数，使其允许形参为string类型

+ `int calc(int,int); int calc(const int, const int);` 重复声明，c++中允许函数重复声明，不会报错。

+ 在局部作用域中（如函数中）声明函数不是一个好的选择。在调用函数时，一旦在当前作用域中找到了所需的名字，编译器会忽略掉外层作用域中的同名实体，使函数重载失效。

### 函数默认实参

+ 使用默认实参调用函数时，只能省略尾部的实参。
+ 在给定作用域中一个形参只能被赋予一次默认实参，但可以多次声明。
+ 表达式能作为默认实参，`sz wd = 80; char def = ' ';string screen(sz = ht(),char = def);`

### 内联函数和constexpr

+ `inline const string &shorterString(const string s1,const string s2){return s1.size() <= s2.size()?s1:s2};` 内联函数只是向编译器发出一个请求，编译器可以忽略这个请求。
+ 内联机制用于优化规模较小，调用频繁的函数。如上例中的内联函数在编译时将被替换成 `s1.size() <= s2.size()?s1:s2`

+ 内联函数和constexpr通常定义在头文件中。

### 调试帮助

+ 我们可以把assert预处理宏 当成调试程序的一种辅助手段，但是不能用它替代真正的运行时逻辑检查，也不能替代程序本身应该包含的错误检查。`assert(s==sougnt)`
+ NDEBUG 可使用以下名字来调试：`__FILE__,__LINE__,__TIME__,__DATE__` 分别为 存放文件名的字符串字面值，存放当前行号的整形字面值，存放文件编译时间的字符串字面值，存放文件编译日期的字符串字面值。

```c++
#define NDEBUG
void print(const int ia[],size_t size){
#ifndef NDEGUB
cerr<< __func__<<"array size is "<<size << endl;
#endif}
```

### 函数匹配

+ 编译器将因为调用函数具有二义性二拒绝请求，即每个可行函数都无法从整体上判断孰优孰劣。
+ 调用重载函数时应尽量避免强制类型转换。
+ 实参类型转换顺序如下：1，精确匹配。 2，通过const转换实现匹配。 3，类型转换。如 char 到 int。4，算数类型转换或指针转换。如 double到int。 5，通过类类型转换匹配。

### 函数指针

+ 指向不同函数类型的指针间不存在转换规则。
+ 重载函数的指针必须清晰的界定参数与返回类型`void ff(unsigned int);void ff(int*); void (*pf1)(unsigned int) ==ff;`

+ 使用类型别名来简化函数指针代码。`typedef bool Func(const string&, const string&); void useBigger(const string&,Func);`

+ 返回函数指针：
  + 使用类型别名`using F = int(int*,int); using PF = int(*)(int*,int);` `PF f1(int); F *f1(int);` 
  + `int (*f1(int))(int*,int);`
  + 尾置返回类型。`auto f1(int) -> int (*)(int*, int);` 

+ 例6.7

```c++
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return (a - b); }
int multiply(int a, int b) { return a * b; }
int divide(int a, int b) { return b != 0 ? a / b : 0; }
void test()
{
    using p = int(int, int);
    vector<p*> vec{ add, sub,multiply, divide };
    for (auto f : vec) {
        cout << f(1, 2) << endl;
    }
}
```

## 第七章 类

+ 定义在类内部的函数时隐式的inline函数
+ 常量成员函数：参数列表后面的const表示this是一个指向常量的指针
+  类外定义，类内声明`Sales_data::Sales_data(std::istream &is){read(is, *this);}` 
+ struct和class定义类的唯一区别就是默认的访问权限，class默认全部为private，struct默认全部public。
+ 可以在类内和类外声明inline，令成员作为内联函数。
+ 返回`Screen &` 与返回 `Screen` 的差别。`Screen &set(pos r, pos col, char ch){.....return *this;}`
+ 从const 成员函数返回 *this ，若返回的是引用，则返回的是常量引用。 `const Screen& display(.....)const{.....}`
+ 建议：公共代码使用私有功能函数。类函功能的实现与函数的设计应考虑到 后续类规模发展使函数复杂时所需改动的工作量。因为类内部定义的内联函数，额外的函数调用不会增加任何开销。
+ 类想把重载函数声明称友元，则要对函数中的每一个分别声明。
+ 友元声明的作用时影响访问权限，它本身并非普通意义上的声明。即使类内声明了友元，类外也需要声明。（有的编译器并不强制执行这条规则）

```c++
class Person{
    // 先声明友元
    public:
    /*
    这边写接口函数
    */
        Person()= default;//类有另一个构造函数，那么defualt函数是必须的。
        Person(int a, int b){m_a = a; m_b = b;}
        person(int a, int b): m_a(a),m_b(b){} //下方先声明int m_a,int m_b，再根据声明的顺序进行定义初始化
        person(person &p)
        //添加explicit ，禁止通过隐式法调用构造函数
        explicit Person(const Person &p){
            m_a= p.a; 
            name = (char *)malloc(strlen(str)+1);//再做拷贝时候，重新给对象开辟一个空间
            strcpy(name,p.name);
        }//使用深拷贝，代替系统默认的浅拷贝构造，简单的浅拷贝做了简单的值拷贝，类中变量指向同一个地址，析构时会出错
    ~Person(){free(name);
             name = NULL;} //析构函数 类名前加上~， 没有返回值，无参数，不能发生函数重载   
    int m_a;
    int m_b;
}
int main(){
    Person p1(1,2); //构造函数再实例化对象时自动调用
    Person P2; //无参构造不使用括号
  	person(1,2);//匿名对象；或 person()无参构造调用匿名对象;生命周期再当前行
    //销毁之前（如出了函数，或作用域）析构函数自动调用
    person(p2);//再定义时，不能用括号法调用匿名对象
    person p1 = person(10,"luchy"); //显示法调用有参构造
    person p1 = {10,"lucy"} //隐式法(不大使用)
}
```



#### 构造函数2

+ 最好令构造函数初始值的顺序与成员声明的顺序保持一致。而且如果可能的话，尽量避免使用某些成员初始化其他成员。

+ 用一个成员初始化另一个成员时，应考虑顺序问题。

+ 对于委托构造函数，受托函数总是会被先执行。

+ explicit 限制只能直接初始化。编译器将不会再自动转换过程中使用该构造函数。

+ 聚合类（成员全部public，没有构造函数，没有初始值，没有基类）才能够使用隐式法初始化：`Sales_data item = {"123-456",25,15.99}`

#### 类的静态成员

+ static 关键字则只出现在类内部的声明语句中。类外声明不能重复static关键字。

+ 要想确保对象只定义一次，最好把静态数据成员的定义与其他非内联函数的定义放在同一个文件里。
+ 类内的静态成员初始化应使用常量表达式。

+ 编译阶段就分配内存；不能再类内初始化，只能声明；存在静态全局区；所有类成员共享1个静态成员
+ 可以利用静态成员来实现类的单例模式。



## 第八章

### IO 类

+ 当一个程序崩溃后，它所输出的数据很可能停留在输出缓存区等待打印。
+ 持续更新

## 第九章 容器

+ list双向链表，forward_list单向链表

+ `vector<>::const_iterator` 不能修改元素的迭代器，`c.cbegin();c.cend();`

+ 迭代器（即地址）的大小比较没有意义，不应该在while条件中以迭代器大小为比较。

+ array类型必须同时指定元素类型和大小。`array<int,10> arr;`

+ 接受容器创建拷贝构造时，全部类型必须一致。接受两个迭代器创建的拷贝构造，不要求类型相同，只要拷贝的元素能转换就行。
+ `vector<int>(v1).swap(v1);` swap收缩空间

+ 除了 array ，swap只是交换了两个容器的内部数据结构，不对元素进行拷贝，删除等处理，时间复杂度为常数。

### 顺序容器操作

+ 对vector, string, deque插入或者删除元素会使所以指向容器的迭代器引用和指针失效。
+ insert返回指向第一个新加入元素的迭代器。
+ emplace直接构造元素，如：`c.emplace_back("123",25,15.9); 类似 c.push_back(Sales_data("123",25,15.9));` emplace也可以使用默认的构造函数如：`c.emplace_back()`

+ `c.back(), c.front(), c[] `等访问成员返回的是引用。

+ .at() 越界的话会抛出out_of_range错误，下标[]不会。
+ 删除元素的函数并不检查其参数，在删除元素钱，程序员必须确保他们存在。如`pop_back(), pop_front(), erase(),clear()`
+ 对容器进行操作后（如删除或者插入元素等），必需要更新迭代器。使用无效迭代器，指针或者引用都是严重运行错误。

+ forward_list 可以用 before_begin()迭代器，它的操作比较特别
+ 如果使用`resize`缩小容器，则指向被删除的元素的迭代器，引用和指针都会失效。
+ capacity（最大容量） 和 size（已有元素大小）

+ string 和数值转换相关函数

## 第十章 泛型算法

+ 泛型算法不会改变底层容器的大小（因为都是通过迭代器操作）。他可能改变，移动容器中的元素，但不会直接添加或删除元素。
+ 只读算法：find(beg, end, val), count(beg, end, val), accumulate(beg, end, start_val), equal(l1_beg, l1_end, l2_beg)
+ 写入算法 fill(beg, end, val), fill_n(beg, n, val), 
+ `vector<int>  vec;   auto it = back_inserter(vec); *it = 42;` 通过back_inserter赋值，向vec添加元素。
+ `auto ret = copy(begin(a1), end(a1), a2);` ret指向a2尾元素之后的位置。复制要确认a2的大小足够。
+ `auto end_unique = unique(words.begin(),words.end());`  unique不会删除元素，而是将不重复的元素向前覆盖重复的元素。 

+ `bool isShorter(){return a.size()<b.size()} stable_sort(s.begin(),s.end(),isShorter);`

### lambda

+ lambda `stable_sort(w.begin(),w.end(),[](const string &a, const string &b){return a.size() < b.size();});`
+ `int sz = 10; find_if(w.beg(),w.end(),[sz](const string &a){ return a.size()>= sz;} );` 获取迭代器，指向第一个符合条件的地址。 捕获的值为lambda 创建时候sz的值，而不是使用时候的sz的值。**如果要使用最新的sz值，那么应该捕获sz的引用。[&sz]**
+ `[&, c] (const string &s){ os << s << c;}` c显示捕获，值捕获；os隐式捕获，引用捕获。
+ 改变捕获的值：`auto f = [v1]() mutable {return ++v1;}`
+ 指定返回类型：`[](int i)-> int {if (i<0) return -i; else return i;}` 使用尾置返回类型。
+ `auto wc = find_if(w.begin(),w.end(), bind(check_size, _1, sz))`  `_1` 表示可调用参数的位置，`_1`为第一个参数。
+ `auto g = bin(f,a,b,_2,c,_1); g(X,Y)即为f(a,b,Y,c,X)` 

### 迭代器

+ front-inserter 生成的迭代器会将插入的元素序列顺序颠倒。
+ 插入迭代器进行 *it，++it，it++不会发生什么
+ `istream_iterator<int> in_iter(cin); istream_iterator<int> eof; while(in_iter != eof)` 绑定到流的迭代器，一旦关联到流遇到文件尾或者IO错误，迭代器的值舅和尾后迭代器相等。
+ 巧妙利用算法与迭代器 `istream_iterator<int> in(cin),eof; cout<< accumulate(in, eof, 0) << endl;`
+ `ostream_iterator<int> out_iter(cout," ); copy(vec.begin(),vec.end(),out_iter);` 使用copy打印，比for循环简单。

+ 灵活应用`rbeg(),rend()` 反向迭代器

### 特定容器算法

+ 优先使用成员函数版本算法，如`list 使用 .merge(), .remove(), .sort(comp, .unique()`

## 第 十一 章 关联容器

+ `map<string, size_t> word_count = {{"a",1},{"b",1}}; word_count.insert({word,1}); word_count["c"] = 1`

+ `word_count.find()` 返回迭代器指向当前查找元素的位置否则返回map::end()位置

  ```
  it = myMap.find(key);
  if(it != myMap.end())
    { string valueStr = it->second;}
  ```

  

+ `pair<T1,T2> p;`

+ `set<int> s = {....}; s.find(), .count()`set 的迭代器是const的。
  `set<int>::iterator it; for(it=s.begin();it!=s.end();it++){*it;}`

+ 利用无序容器的优势`unorderd_map`

## 第 十二 章 动态内存

+ `shared_ptr<int> p3 = make_shared<int>(42); `只要有对象引用shared_ptr，他就不会被销毁。
+ new 完 delete
+ `shared_ptr<int> p2(new int(1024));` 
+ `unique_ptr<int> p(new int(42))` unique不支持拷贝和赋值，可以通过reset和release来将指针的所有权从一个非const unique_ptr 转向另一个 unique。可以拷贝或赋值一个将要被销毁的unique，如从函数返回一个unique。
+ unique 必须绑定 new
+ 不使用相同的内置指针值初始化多个智能指针。
+ 不delete get() 返回的指针。
+ 不使用get 初始化 智能指针
+ 使用智能指针管理的不是new分配的内存，记得给他传递一个删除器。
+ weak_ptr 需要 shared_ptr 来初始化。
+ `ListNode* dummyHead = new ListNode(0);`

### 动态数组

+ `int *p = new int[42]{1,2,3,4}; delete [] p;`
+ `unique_ptr<int[]> p(new int[10]);`
+ `allocator<string> alloc; auto const p = alloc.allocate(n);` allocator 分配未构造的对象。
+ `auto q = p; alloc.construct(q++,10,'c');`

+ `while(q!=p) alloc.destroy(--q);` 释放构造的元素。 `alloc.deallocate(p,n);` 释放空间

## 第 十三 章 拷贝控制

+ 当对象的引用或者指针离开作用域时，析构函数不会执行。

+ 使用 `NoCopy(const NoCopy&) =delete;` 阻止拷贝构造。而不应该将它们声明为private的。

+ 赋值运算符正确工作应为：在销毁左侧运算对象资源之前，拷贝好右侧对象资源。


```c
void swap(HasPtr &lhs, HasPtr &rhs)
{
using std::swap;
swap(lhs.ps,rhs.ps);
swap(lhs.i,rhs.i);
} // swap内的swap是std命名空间下的
```

+ 变量是左值，不能将一个**右值引用**直接绑定到一个变量上，即使变量是右值引用。可以通过`int &&rr3 = std::move(rr1);` move意味着除了对rr1赋值或者销毁它之外，我们将不再使用它。

+ 移动构造函数：除非标准库知道我们的移动构造函数不会抛出异常，否则他会认为移动我们的类对象可能会抛出异常，平且为了处理这种可能性而做一些额外的工作。使用`noexcept`表示该类不会报错。

+ 移动迭代器的解引用运算符生成一个右值引用



## 第 十四 章 重载运算与类型转换

+ =，[]，()，和->操作只能通过成员函数进行重载

+ << 和>>只能通过全局函数配合友元函数进行重载

+ 不要重载&&，||，不然短路规则可能会实现不了
+ 右击系统库的函数，点击转到定义可以查看函数定义
+ 如果类具有比较性，那么应该重载比较符号。

+ **所有的一元运算符建议使用成员函数重载**

```c++
person p1;
person p2;
person p3 = p1 + p2;
//系统调用
operator+(p1,p2)
或
p1.operator(p2)

person operator+( person &p1, person &p2){
person p(p1.age + p2.age)
return p;
}
// 或类内实现

class person
{
public:
    person& operator++(){
        this->num = this->num +1
            return *this;
    }
    person(int age,string name1)
    {
        this->age = age;
        this->name = name;
    }
    bool operator==(person&p2)
    {
	return this-age == p2.age && this->name == p2.name;
    }
    person operator+(person &p2){
    person p(this -> age+pe.age)
        return p;
}
    int age;
    string name;

}
```

+ 赋值运算符重载

```c++
p2 = p; //p2.operator=(p1)

person& operator=(person &p1){
this->age = p1.age;
this->name = p1.name;
return *this;
} //系统自动生成的=重载只做简单的值拷贝；这样p1的name与p2的name指向同一个地址。在释放空间时会出错
person& operator=(person &p1){
this->age = p1.age;
this->name = new char[strlen(p1.name)+1];
    strcpy(this->name, p1.name);
return *this;
} 
```

+ function 类型：`function<int(int,int)> f1 = add; f1(4,2);`
+ 不能将重载函数的名称直接存入 function 类型对象中。可以使用lambda消除二义性`{"+",[]{int a, int b}{return add(a,b);}}` 这样就知道要用的是使用两个int的add。

+ 定义有类型转换运算符的类，类中实现 `operator int() cost { return val;}`。应避免过度使用类型转换函数。
+ 如果对一个类同时定义了转换目标是算术类型的转换（如int到类，类到int），也定义了重载的运算符，那么重载运算符与内置运算符会存在二义性问题。

## 第 十五 章 面向对象程序设计

+ 基类定义的虚函数，派生类需要提供自己的新定义以覆盖。
+ 运行时绑定（动态绑定）：因为参数存在类，根据传入父类或者子类才决定函数运行版本。
+ 基类通常都应该定义一个虚构造函数
+ protected 派生类成员可访问，其他不能访问
+ 不能作为基类，`class Last final{};`不能继承Last类
+ 基类中的静态成员只会存在一个，不会被重复创造。
+ 在派生类中可以使用override来说明和检查虚函数。

```c++
class Animal
{public:
    int age;
protected:
    int b;
private:
    int c;};
class Dog :public Animal
{/*public:
    int age;
protected:
    int b;
private:
    int c;
    */} //公有继承方式，基类中是什么控制权限，继承到子类中也是什么控制权限

class B : protected Animal
{ /* 保护继承，将父类中共有的变成保护的，子类不能访问父类的private成员
protected:
 	int age;
    int b;
private:
    int c;
    */}
class C :private Animal
{/* 私有继承，将父类中所有成员变成私有的，子类不能访问父类的private成员，看继承之前的权限
private:
    int c;int age;int b;
    */}
```

## 第 十六 章 模板与泛型编程

```c++
template <class T> //定义一个模板，模板的通用类型未T
void swap_temp(T &a,T &b)
{	T temp = a;
    a = b;
    b = temp;}
template <class T1, class T2>
class animal
{
public:
    animal(T1 a, T2 b)
    {
        age = a;
        data = b;
    }
	T1 age;
    T2 data;
}; //类模板不能自动推导类型

//类外定义类模板成员函数
template<class T>
BlobPtr<T> BlobPtr<T>::operator++(int){
    BlobPtr ret = *this;
    ++*this;
    return ret;
};
```

## 其他

rand()会返回一随机数值, 范围在0至RAND_MAX 间。RAND_MAX定义在stdlib.h, 其值为2147483647

```c++
int pos = rand()%(r-l)+l;  // r - l 之间的随机整数
```

[quicksort 模版](https://leetcode-cn.com/problems/smallest-k-lcci/submissions/)

#### 

`bool binary_search(arr[],arr[]+size , target)` 目标值是否在范围内。

`int lower_bound(arr[],arr[]+size , target):` 返回目标值在单调范围内应该插入的位置。