import React, { useContext, useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../../context/userContext";

const Home = () => {
  const { posts, getAllPosts } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

   const loadPosts = async () => {
     if (loading || allPostsLoaded) return;

     setLoading(true);
     const newPosts = await getAllPosts(page);

     if (newPosts.length === 0) {
       // No more posts available, set flag to true
       setAllPostsLoaded(true);
     } else {
       setPage((prevPage) => prevPage + 1);
     }

     setLoading(false);
   };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} />;
  };

  const handleLoadMore = () => {

    loadPosts();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Posts</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          return (
            <View style={styles.post}>
              <Text>{item.title}</Text>
              <Image
                source={{ uri: item.user.profilePhoto.url }}
                style={{ width: 50, height: 50 }}
              />
              <Text>{item.user.username}</Text>
              <Image
                source={{ uri: item.image }}
                style={{ width: 200, height: 200 }}
              />
              <Text>{item.description}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  post: {
    width: 350,
    margin: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#33333336",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
});
