---
title: Singapore House Recommender System
date: 2019-11-08
author: Kevin 吴嘉文
categories:
- Project|项目
tags:
- ML|机器学习
- python
- En
mathjax: true
toc: true
comments: 基于新加坡Airbnb房源，实现通过房屋周边环境，推荐用户心意的房屋
---

# Singapore House Recommender


> Nowadays youth spend less ans less time is their room. They are more likely to rent house based on the surrounding venues, regardless of room size, equipment and decoration.
>
> For instance, Chinese commuter may want to find some house that surrounded by Chinese restaurant if they can not accept other type of food.
>
> This system enables user to filter house based on the outside environment.

## Data Source

+ House information is available on [inside Airbnb](http://insideairbnb.com/), including House ID, Latitude, Longitude, price.
+ Venue information is available on [Foursquare API](https://developer.foursquare.com/) 

```python
# request data throught Foursquare API
def getNearbyVenues(names, latitudes, longitudes, radius=800):    
    venues_list=[]
    for name, lat, lng in zip(names, latitudes, longitudes):
        print(name)
        # create the API request URL
        url = 'https://api.foursquare.com/v2/venues/explore?&client_id={}&client_secret={}&v={}&ll={},{}&radius={}&limit={}'.format(
            CLIENT_ID, 
            CLIENT_SECRET, 
            VERSION, 
            lat, 
            lng, 
            radius, 
            LIMIT)
            
        results = requests.get(url).json()["response"]['groups'][0]['items']
        
        # return only relevant information for each nearby venue
        venues_list.append([(
            name, 
            lat, 
            lng, 
            v['venue']['name'], 
            v['venue']['location']['lat'], 
            v['venue']['location']['lng'],  
            v['venue']['categories'][0]['name']) for v in results])

    nearby_venues = pd.DataFrame([item for venue_list in venues_list for item in venue_list])
    nearby_venues.columns = ['House Id', 
                  'House Latitude', 
                  'House Longitude', 
                  'Venue', 
                  'Venue Latitude', 
                  'Venue Longitude', 
                  'Venue Category']
    return(nearby_venues)
```

## Key Points

In the following, the venue proportion is consider as the "feature" of house. House with similar venue proportion will be the same cluster.

### Notation

+ venue proportion matrix
  + venue proportion of house $$i$$ ,$$f_{ij} = \frac {\text {the number of venue j}}{\text {total number of venues around the house}}$$ 
  + The following table shows, House **38886116** has no **ATM** around, and **14%** of the venue around it are **Chinese Restaurant**

| House ID     | ATM    | ...  | Chinese Restaurant | ...  |
| ------------ | ------ | ---- | ------------------ | ---- |
| **38886116** | 0.0    | ...  | 0.14               | ...  |
| **38888083** | 0.0078 | ...  | 0.10               | ...  |

+ similarity of house 1 and 2 define as:

  $$S_{12} = \sum_{j=0}^k|f_{1j} - f_{2j}| \text{ , where k is the total number of venue types}$$


### number of K-Mean Cluster


Elbow method is a nice way for choosing the optimal k. 

However, in this case, Elbow method do not indicate the optimal value of k. 

```python
# Figure: Cost and The Number of Cluster
K=range(1,15)
grouped_clustering = grouped
meandistortions=[]
for k in K:
    kmeans=KMeans(n_clusters=k , random_state=0)
    kmeans.fit(grouped_clustering)
    meandistortions.append(sum(np.min(
            cdist(grouped_clustering,kmeans.cluster_centers_,
                 'euclidean'),axis=1))/grouped_clustering.shape[0])
plt.plot(K,meandistortions,'bx-')
plt.xlabel('k')
plt.ylabel(u'Cost')
plt.title(u'Determing the K value')
```
![cluster_num-1604742920241](/img/SingaporeHouseRecommender/cluster_num-1604742920241.png)



### Visualization: Plotting Earth Map

```python
# Figure: Singapore House Cluster Result
latitude = 1.305817 # Singapore location
longitude = 103.860307
selected_stay = merged_all  # datasets with location and cluster result
map_clusters = folium.Map(location=[latitude, longitude], zoom_start=11)

# set color scheme for the clusters
x = np.arange(kclusters)
ys = [i + x + (i*x)**2 for i in range(kclusters)]
colors_array = cm.rainbow(np.linspace(0, 1, len(ys)))
rainbow = [colors.rgb2hex(i) for i in colors_array]

# add markers to the map
markers_colors = []
for lat, lon, poi, cluster in zip(selected_stay['latitude_x'], selected_stay['longitude_x'], selected_stay['id'], selected_stay['Cluster Labels']):
    label = folium.Popup(str(poi) + ' Cluster ' + str(cluster), parse_html=True)
    folium.CircleMarker(
        [lat, lon],
        radius=1,
        popup=label,
        color=rainbow[cluster-1],
        fill=True,
        fill_color=rainbow[cluster-1],
        fill_opacity=0.7).add_to(map_clusters)
       
map_clusters
```


![sg_house](/img/SingaporeHouseRecommender/sg_house.png)

### Recommend Criteria

user input a list of preferred venue with corresponding proportion, which will be transform and store as venue proportion matrix:

| user id | ATM  | ...  | Chinese Restaurant | ...  |
| ------- | ---- | ---- | ------------------ | ---- |
| user_1  | 0.0  | ...  | 0.10               | ...  |

System recommend the house that has most similar venue proportion with user preference.
$$
\mathop{\arg\min}_{i} \sum_{j=0}^k|f_{ij} - f_{uj}|  \text { ,where u is user id, i is house id}
$$



> The system can be improved by adding online learning system to update the clustering, keeping crawling updating house information. 
>
> The key point of this system is recommend the house based on the outside environment. You are not able to achieve that on Airbnb website or other apps.
>
> Hope you enjoy this idea :)