---
title: Logistic Regression
date: 2020-10-17
author: Kevin 吴嘉文
categories:
- Notes|理论梳理
tags:
- In English
- Machine Learning
mathjax: true
toc: true
comments: 

---

## Logistic regression

> Basic theory and coding on sklearn for logistic regression

<!--more-->

### The design of binary classification

We define the function of odds and using exponential function to model the odds:
$$
\operatorname{Odds}=\frac{p\left(1 \mid \boldsymbol{x}_{i}\right)}{p\left(-1 \mid \boldsymbol{x}_{i}\right)} = e^{w^Tx_i}
$$
Therefore
$$
\frac{p\left(1 \mid \boldsymbol{x}_{i}\right)} {1-p\left(1 \mid \boldsymbol{x}_{i}\right)} =e^{w^Tx_i}\\
p(1 | x_i)= \frac {e^{w^Tx_i}}{1+e^{w^Tx_i}}\\ = \frac 1{1+e^{-w^Tx_i}} =\sigma(w^Tx_i)
$$
After transform can get the sigmoid function

#### Why sigmoid function?

We need threshold to distinct classes, so the function can not be too flatten. 

Some times we use tanh, Relu, or Heaviside function (step function) to replace sigmoid function. It depends on the model needs. Such as using Relu for faster training, using tanh for generating output from -1 to 1.

#### Derivative of sigmoid:

$$
\frac{d \sigma}{d x}=\sigma(x)[1-\sigma(x)]
$$

not that useful

### Decision boundary 

 $W^T X  = 0$, is the boundary.

#### Why it is linear?

Recall projection of vector, $W^T X  = 0$  means the projection of X on vector W is a point 0. Therefore, vector X should be vertical to vector W and being linear.

 ![5946c434e67d6ed6794e5df3f5d521b](/img/logistic/5946c434e67d6ed6794e5df3f5d521b.png)

*(Picture: Example for 2-D X. X-axix: x1,y-axix: x2)*

+ The direction of W is always from Negative to positive. (That is why when threshold increase, precision increase?)
+ $W^T X > 0 $  is also called **pos. half plane**

### Maximum likelihood

+ **Maximum Likelihood Estimate(MLE):** find the best parameters that maximize the likelihood of the observed( training )data

#### For Logistic Regression

Using Log likelihood instead is good for formula derive and compute
$$
\boldsymbol{w}^{*}=\arg \max _{\boldsymbol{w}} \sum_{i=1} \ln p\left(y_{i} \mid \boldsymbol{x}_{i}\right)\\
\boldsymbol{w}^{*}=\arg \min _{\boldsymbol{w}} \mathcal{L}(\boldsymbol{w})=\arg \min _{\boldsymbol{w}} \sum_{i=1}^{n} \ln \left(1+e^{-y_{i} \boldsymbol{w}^{\top} \boldsymbol{x}_{i} }\right)
$$
**Gradient Descent Algorithm**
$$
\begin{array}{c}
\boldsymbol{w}_{t+1}=\boldsymbol{w}_{t}-\eta_{t} \nabla \mathcal{L}\left(\boldsymbol{w}_{t}\right) \\
\nabla \mathcal{L}(\boldsymbol{w})=\sum_{i=1}^{n} \frac{-y_{i} \boldsymbol{x}_{i} e^{-y_{i} \boldsymbol{w}^{\top} \boldsymbol{x}_{i}}}{1+e^{-y_{i} \boldsymbol{w}^{\top} \boldsymbol{x}_{i}}}=-\sum_{i=1}^{n} y_{i} \boldsymbol{x}_{i}\left[1-p\left(y_{i} \mid \boldsymbol{x}_{i}\right)\right]
\end{array}
$$

+ When predict more accurate, gradient moving more slowly. So if there is a mathematical solve gradient = 0, then we will directly got the optimized result. (Same idea as Linear Regression)

### Sklearn API

[LogisticRegression API](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html#sklearn.linear_model.LogisticRegression)

```python
class sklearn.linear_model.LogisticRegression(penalty='l2', *, dual=False, tol=0.0001, C=1.0, fit_intercept=True, intercept_scaling=1, class_weight=None, random_state=None, solver='lbfgs', max_iter=100, multi_class='auto', verbose=0, warm_start=False, n_jobs=None, l1_ratio=None)
```

+ **choose solver:**
  + ‘newton-cg’, ‘lbfgs’, ‘sag’ and ‘saga’ handle L2 or no penalty; ‘liblinear’ and ‘saga’ also handle L1 penalty

| Case                              | Solver                        |
| :-------------------------------- | :---------------------------- |
| Small dataset or L1 penalty       | “liblinear”                   |
| Multinomial loss or large dataset | “lbfgs”, “sag” or “newton-cg” |
| Very Large dataset                | “sag”                         |

   #### Plot Decision Boundary

```python
plt.plot((- estimator.coef_[0][1] * np.array((min(x_train[:,1]), max(x_train[:,1]))) - estimator.intercept_[0]) / estimator.coef_[0][0], np.array((min(x_train[:,1]), max(x_train[:,1]))))
```

#### Derive plotting function

$$
W^TX=W_1X_1+W_2X_2 = 0\\
X_2 = \frac{-W_1X_1}{W_2}
$$

Therefore find value for 2 pairs $(X_1,X_2)$ can plot the boundary.

+ `coef_` is of shape (1, n_features) when the given problem is binary. In particular, when `multi_class='multinomial'`, `coef_` corresponds to outcome 1 (True) and `-coef_` corresponds to outcome 0 (False). In this case `estimator.coef_` output `array([[0.66913433, 0.41477149]])`

#### Contours

+ lines have same probabilities 

+ Notice The density of contours

### Evaluation

+ Accuracy = Correct Prediction/Total number of prediction ; (Accuracy no good)

$$
Precision = \frac {TP}{TP+FP}\\
Recall = \frac {TP}{TP+FN}
$$

+ Precision: When limit resource, we want
+ Recall: When detect covid-19, we want

If we are going to use the model to do a breif filter, than we will prefer re have high recall.

Precision and recall curve.

+ Some times goes up since, when threshold goes down. It depends on the number of positive case increased

#### F1 Score

+ harmon mean -   prevents both of the numbers became too small. 

$$
\frac {2ab}{a+b} =\frac 1{\frac{1/a + 1/b} 2}
$$


$$
F_{\beta}=\left(\frac{\text { Precision }^{-1}+\beta^{2} \cdot \text { Recall }^{-1}}{1+\beta^{2}}\right)^{-1}=\frac{\left(1+\beta^{2}\right) \cdot \text { Precision } \cdot \text { Recall }}{\beta^{2} \cdot \text { Precision }+\text { Recall }}
$$

**Larger beta= Recall is more important** than precision. Smaller beta Precision is more important than recall. 

+ Usually, when threshold up, precision up, recall down

#### ROC

+ True positive = recall

  ![image-20210126220146586](/img/logistic/image-20210126220146586.png)

The further from random guess, the better it is. 

+ **C performs as well as C', C' is always predict different from C.**

If C predict TP, FP, FN,TN, then
$$
TPR_C = \frac {TP}{TP + FN}, FPR_C = \frac{FP}{FP+TN}\\
$$
C' predict totally different from C, then
$$
TPR_{C'} =\frac {FN}{TP + FN} = 1 - TPR_C\\FPR_{C'} = \frac{TN}{FP+TN} = 1-FPR_C
$$

+ **point on mid line is random guess**

#### ROC

Modify threshold to plot different ROC . $ROC : \{(TPR(T),FPR(T)) | 0<T<1 \}$

ROC could be crossed, but we still need to choose higher AUC.

#### AUC - Area under ROC curve

High is good

AUC equals to the probability that the classifier will rank a randomly chosen positive example higher than a randomly chosen negative example. (Similar to probability to predict correctly.)



## Multiclass Classification

### One-vs-all

### Softmax

$$
\begin{aligned}
p\left(1 \mid \boldsymbol{x}_{i}\right): p\left(2 \mid \boldsymbol{x}_{i}\right): p\left(3 \mid \boldsymbol{x}_{i}\right): p\left(4 \mid \boldsymbol{x}_{i}\right) &=\\
e^{\boldsymbol{w}_{1}^{\top} \boldsymbol{x}_{i}}: e^{\boldsymbol{w}_{2}^{\top} \boldsymbol{x}_{i}} &: e^{\boldsymbol{w}_{3}^{\top} \boldsymbol{x}_{i}}: e^{\boldsymbol{w}_{4}^{\top} \boldsymbol{x}_{i}}
\end{aligned}
$$

$$
p\left(1 \mid \boldsymbol{x}_{i}\right)=\frac{e^{\boldsymbol{w}_{1}^{\top} \boldsymbol{x}_{i}}}{e^{\boldsymbol{w}_{1}^{\top} \boldsymbol{x}_{i}}+e^{\boldsymbol{w}_{2}^{\top} \boldsymbol{x}_{i}}+e^{\boldsymbol{w}_{3}^{\top} \boldsymbol{x}_{i}}+e^{\boldsymbol{w}_{4}^{\top} \boldsymbol{x}_{i}}}
$$

#### Loss funciton

+ differentialable owning to the exponential.

$$
\mathcal{L}(\boldsymbol{W})=-\sum_{i=1}^{n} \sum_{k=1}^{K} \delta\left(y_{i}, k\right) \ln p\left(y=k \mid \boldsymbol{x}_{i} ; \boldsymbol{W}\right)
$$

![image-20210202194232082](/img/logistic/image-20210202194232082.png)

So when the $W^TX$ Dots $\delta$ (the above vector), the entropy of correspoindding class will be maintain

### Softmax in sklearn

+ Building model: `test = linear_model.LogisticRegression(C = 1.0,multi_class = 'multinomial',solver
  = 'newton-cg').fit(x_train,y_train)`

+ compute $XW $ matrix: Where each row is a $w_i^Tx_i$ `np.dot(x_test,test.coef_.T)+test.intercept_`

+ compute $e^{wx}$ `ewx = np.exp(wx)`

+ compute the softmax based on above formula: `ewx/np.sum(ewx,axis = 1).reshape(3450,-1)`

Therefore we get the softmax result, which is same with `test.predict_proba(x_test)` 

+ if we take the log value of softmax, then we have `test.predict_proba(x_test)` , which is same with `test.predict_log_proba(x_test)` 

+ Cross Entropy - $\mathcal{L}(\boldsymbol{W})=-\sum_{i=1}^{n} \sum_{k=1}^{K} \delta\left(y_{i}, k\right) \ln p\left(y=k \mid \boldsymbol{x}_{i} ; \boldsymbol{W}\right)$ 

The cross Entropy can be computed using: 

````
metrics.log_loss(y_test,logit_multi[i].predict_proba(x_test))
````

**The key is unlike Binary cross entropy, we only sum the probability that we have correct prediction.** The following shows a manual way to compute the cross entropy

```python
# compute manually

def get_neg_log_loss(x_train,y_train,model):
    a = model.predict_log_proba(x_train)
    b = (y_train-1) # since y[i] in [1,2,3,4], in other to use it as index, we do -1.
    filt_log_prob = np.array([a[i][b[i]] for i in range(b.size)]) # can use np choose
    ill = -np.sum(filt_log_prob)/b.size
    return ill
```

## 