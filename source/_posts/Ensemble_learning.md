---
title: Ensemble Learning
date: 2021-03-09
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

## Ensemble Learning

> Bagging, random Forest, Adaboost etc hints for theory and codding in sklearn.
>
> The basic idea of ensemble learning is Many me = Strong

<!--more-->

### Voting

Voting can use for reduce bias and variance

+ for one model to has error rate 0.35, the ensemble classifier make error is just with probability of: 0.06
+ can reduce Variance owning to reduce 'luck', which generate by one model.

$$
\sum_{i=13}^{25}\left(\begin{array}{c}
25 \\
i
\end{array}\right) \varepsilon^{i}(1-\varepsilon)^{25-i}=0.06
$$

To do ensemble well, we need to make sure that the 25 models are independents with each other, but in fact it is hard to do that.



### Bagging

[link for RF and Bagging](https://blog.csdn.net/loveliuzz/article/details/78755416)

#### Bootstrap Sampling

+ Given a set D containing m training samples
+ Create D* by drawing m examples at random with replacement from D
+ Each bootstrap sample contains 63% distinct data samples from D

#### Bagging process

![image-20210223200833412](/img/Ensemble_learning/image-20210223200833412.png)



#### Bagging example:

```
param_grid["bagging"] = {
  "n_estimators": np.arange(10, 100, step=10),
    "max_samples": [0.5,0.8],
  "max_features": [0.2,0.4,0.6,0.8],
  "bootstrap": [True, False],
    "n_jobs":[-1]
}

bagging = ensemble.BaggingClassifier()
random_cv = RandomizedSearchCV(bagging, param_grid["bagging"], n_iter=n_iter, cv=skf, scoring="roc_auc", n_jobs=-1)
random_cv.fit(X_train, Y_train)
params = ramdom_cv.best_params_

bagging.set_params(params)
bagging.fit(x_train, y_train)
```

+ max_samples is the number to draw from X to form each bootstrap sampling.

+ max_features: The number of features to draw from X to train each base estimator ( without replacement by default)

The following is 10 weaker learners,

![image-20210223200947334](/img/Ensemble_learning/image-20210223200947334.png)

And these weaker learners are ensemble by averaging or voting, that result is shown below.

![image-20210223201032692](/img/Ensemble_learning/image-20210223201032692.png)



### Random Forest

#### How random?

Random select feature to split, but care about selection the value to partition the feature

```python
param_grid["forest"] = {
  "n_estimators": np.arange(10, 100, step=10),
  "max_features": ["auto", "sqrt", "log2"],
  "max_depth":  list(np.arange(10, 80, step=20)) + [None],
  "min_samples_split": np.arange(2, 16, step=2),
  "min_samples_leaf": [1, 2, 4],
  "bootstrap": [True, False],
    "n_jobs":[-1]
}
rforest = ensemble.RandomForestClassifier()
random_cv = RandomizedSearchCV(rforest, param_grid["forest"], n_iter=n_iter, cv=skf, scoring="roc_auc", n_jobs=-1)
random_cv.fit(X_train, Y_train)
rforest.set_params(random_cv.best_params_)
rforest.fit(x_train, y_train)
```

#### Comparing with Bagging

For Bagging, once the feature for splitting is chosen, then this feature will be used for all levels of the tree.

For Random Forest, different features can be chosen for splitting in different levels.

The number of features to consider when looking for the best split

+ the feature selection are done in different stage for bagging and random forest. Random Forest first **randomly select a set of features** before training the sub model. when training, **it will select the partition feature from the feature set.**
+ While Bagging selecting the feature as decision tree, it select the partition feature from all features using ID3, C4.5 GINI etc.

#### cons:

+ inefficient bootstrap sampling
  + Every example has equal chance to be sample
  + No distinction between easy sample and difficult samples - can not focus on the sample that around boundary
+ inefficient model combination
  + constant weight for each classifier
  + no distinction between accurate classifiers and inaccurate classifier

#### Improving

+ focus on examples that are difficult to classify
+ using better combination strategy



### Boosting

Boosting runs much faster than Bagging and Random Forest. And some times generate much better result than bagging.

#### AdaBoost

Key idea: **Handling weighted training examples**

Instance that are wrongly classified will have their weights increased

![image-20210223205521321](/img/Ensemble_learning/image-20210223205521321.png)



**The $$w_i$$ formula in above picture should be**
$$
w_{i} \leftarrow\left\{\begin{array}{lc}
\frac 
{w_{i}} { \exp \left(\alpha_{t}\right)}  \text { if } h_{j}\left(x_{i}\right)=y_{i} \\
w_{i} \exp \left(\alpha_{t}\right) \text { otherwise }
\end{array}\right.update the weights of the samples to be choose to train
$$


+ the error rate should be at least 1/2

Implementations:

+ SAMME & SAMME.R

Classification adaboost can perform even better than NN

#### Parameters 

```
param_grid["adaboost"] = {
  "n_estimators": np.arange(10, 100, step=10),
    "algorithm":['SAMME', 'SAMME.R'],
    "learning_rate":[0.2,0.4,0.5,0.6,0.7,0.8,0,9]
}
```

#### Gradient Boosting

Do regression first, then do regression again on error

Used for regression, not good at classification than adaboost.

### XGboost

[XGboost link](https://xgboost.readthedocs.io/en/latest/python/python_api.html#module-xgboost.sklearn)

#### Parameters

```python
param_grid['xgboost'] = {
    "learning_rate":np.arange(0.1, 0.9, step=0.1),
    "n_estimators":  np.arange(10, 100, step=10),
    "max_depth": np.arange(2, 16, step=2),
    "booster":['gbtree', 'gblinear' , 'dart'],
    "gamma":  np.arange(0.1, 0.9, step=0.1),
    "objective": ["binary:logistic"],
    "use_label_encoder":[False],
    "eval_metric":['logloss'],
    "n_jobs":[-1]
}
```

### Stacking

![image-20210223211117314](/img/Ensemble_learning/image-20210223211117314.png)

```python
ms = [('lr',LogisticRegression()),
          ('svm',SVC()),
          ('nb',naive_bayes.GaussianNB())]
param_grid["stacking"] = {
    "stack_method": ['auto', 'predict_proba', 'decision_function', 'predict'],
    "final_estimator":[tree.DecisionTreeClassifier(),LogisticRegression(),SVC()],
    "cv":[3],
    "n_jobs":[-1]
}       
stacking = StackingClassifier(ms)
random_cv = RandomizedSearchCV(stacking, param_grid, n_iter=n_iter, cv=skf, scoring="roc_auc", n_jobs=-1)
random_cv.fit(X_train, Y_train)    

```

#### Points for stacking:

+ Combine different learning algorithms
+ Stacking learns to combine the base model using a meta-model whereas bagging and boosting combine following deterministic algorithms

#### Process

for all models:

+ split train test data 

+ train x_train, and get y_train
+ test on x_test, get y_test

Combine all y_train into our $$X^{(l2)}$$ for training. Combine y_test for testing.

#### variation

for all models:

+ split train, dev, test data set
+ train on x_train, than predict on dev set. 
+ test on test set

![image-20210302141500320](/img/Ensemble_learning/image-20210302141500320.png)

combine prediction get from dev set to get the transformed training data $$X^{(l2)}$$ , each dev set should not overlap.

take the average of prediction on test set as the transformed test data



#### Blending

We do not perform the cross validation set. 



#### Cons:

+ data leakage on validation set
+ Need much more Time
+ increase demand on infrastructure to maintain and update models. Hard to do online learning

## Parameter Tuning

```python
def get_metrics(y_test,y_pred,beta = 0.5):
    F = metrics.fbeta_score(y_test,y_pred,beta = 0.5,zero_division = 0)
    p = metrics.precision_score(y_test,y_pred,zero_division = 0)
    r = metrics.recall_score(y_test,y_pred, zero_division = 0)
    def get_result(m,threshold):
    global x_test,y_test,x_train,y_train,x_valid,y_valid
    y1_proba = m.predict_proba(x_valid)[:,1]
    auc = metrics.roc_auc_score(y_valid,y1_proba)
    best_f,best_t = 0,0
    Fs = []
    for t in threshold:
        y_pred = y1_proba > t
        P,R,F = get_metrics(y_valid,y_pred)
        Fs.append(round(F,2))
    return Fs
def get_table(threshold,model,model_name,pr = 0):
    global y_test,x_test
    f_result = get_result(model,threshold)
    if pr == 1:
        print(f_result)
    select_t = threshold[f_result.index(max(f_result))]
    y1_proba = model.predict_proba(x_test)[:,1]
    auc = metrics.roc_auc_score(y_test,y1_proba)
    y_pred = y1_proba > select_t
    result = list(get_metrics(y_test,y_pred))
    result.append(auc)
    df = pd.DataFrame(columns = ['Precision','Recall','F_score','AUC under ROC'])
    df.loc[model_name] = result
    return df.T
def random_search(model,param_grid,n_iter = 5):
    global skf,X_train,Y_train
    t1 = time.time()
    random_cv = RandomizedSearchCV(model, param_grid, n_iter=n_iter, cv=skf, scoring="roc_auc", n_jobs=-1)
    random_cv.fit(X_train, Y_train)
    a = random_cv.best_params_
    t = (time.time()-t1)/60
    print(f"Time cost : {round(t,2)} mins\nbest params: {a}")
    return a
    
    
    

```

```python
skf = StratifiedKFold(n_splits = 3, shuffle = True, random_state = 2021)
n_iter = 10
param_grid['xgboost'] = {
    "learning_rate":np.arange(0.1, 0.9, step=0.1),
    "n_estimators":  np.arange(10, 100, step=10),
    "max_depth": np.arange(2, 16, step=2),
    "booster":['gbtree', 'gblinear' , 'dart'],
    "gamma":  np.arange(0.1, 0.9, step=0.1),
    "objective": ["binary:logistic"],
    "use_label_encoder":[False],
    "eval_metric":['logloss'],
    "n_jobs":[-1]
}
params = random_search(xgb.XGBClassifier(),param_grid["xgboost"])
xgboost = xgb.XGBClassifier().set_params(**params).fit(x_train,y_train)
```

```python
expected output:
Time cost : 7.85 mins
best params: {'use_label_encoder': False, 'objective': 'binary:logistic', 'n_estimators': 70, 'max_depth': 8, 'learning_rate': 0.4, 'gamma': 0.5, 'eval_metric': 'logloss', 'booster': 'dart'}
```

