import React, { useState } from 'react';
import { SafeAreaView, FlatList, View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const mockVideos = [
  {
    videoId: 'nP8f5uhQfXk',
    title: 'Srimad Bhagavatam Class - ISKCON Desire Tree',
    thumbnail: 'https://i.ytimg.com/vi/nP8f5uhQfXk/mqdefault.jpg',
    publishedAt: '2024-09-18T10:00:00Z',
    channelTitle: 'ISKCON Desire Tree',
    channelId: 'UCnRrK1O9YSd5Q0U8Vs-4bDA',
  },
  {
    videoId: 'KxMZ1qj1g2A',
    title: 'Bhagavad Gita Chapter 3 - ISKCON Mumbai',
    thumbnail: 'https://i.ytimg.com/vi/KxMZ1qj1g2A/mqdefault.jpg',
    publishedAt: '2024-09-17T11:00:00Z',
    channelTitle: 'ISKCON Mumbai',
    channelId: 'UC8VnQ7Tz4GLK7wYjFzM0uKg',
  },
  {
    videoId: 'F1XFnF2nUbg',
    title: 'ISKCON Bangalore Sunday Feast',
    thumbnail: 'https://i.ytimg.com/vi/F1XFnF2nUbg/mqdefault.jpg',
    publishedAt: '2024-09-16T08:00:00Z',
    channelTitle: 'ISKCON Bangalore',
    channelId: 'UCZJEpQqJ8F6jvU4q6r1FhiA',
  },
  {
    videoId: 'Q2rE0UURR5o',
    title: 'ISKCON Desire Tree - Krishna Katha',
    thumbnail: 'https://i.ytimg.com/vi/Q2rE0UURR5o/mqdefault.jpg',
    publishedAt: '2024-09-15T09:00:00Z',
    channelTitle: 'ISKCON Desire Tree',
    channelId: 'UCnRrK1O9YSd5Q0U8Vs-4bDA',
  },
  {
    videoId: '9l6zQ7h0Fbk',
    title: 'ISKCON Mumbai - Festival Highlights',
    thumbnail: 'https://i.ytimg.com/vi/9l6zQ7h0Fbk/mqdefault.jpg',
    publishedAt: '2024-09-14T10:00:00Z',
    channelTitle: 'ISKCON Mumbai',
    channelId: 'UC8VnQ7Tz4GLK7wYjFzM0uKg',
  },
  {
    videoId: 'p9kXnT4YX5w',
    title: 'ISKCON Bangalore - Daily Darshan',
    thumbnail: 'https://i.ytimg.com/vi/p9kXnT4YX5w/mqdefault.jpg',
    publishedAt: '2024-09-13T07:00:00Z',
    channelTitle: 'ISKCON Bangalore',
    channelId: 'UCZJEpQqJ8F6jvU4q6r1FhiA',
  }
];

const channels = [
  { channelId: '', name: 'All' },
  { channelId: 'UCnRrK1O9YSd5Q0U8Vs-4bDA', name: 'ISKCON Desire Tree' },
  { channelId: 'UC8VnQ7Tz4GLK7wYjFzM0uKg', name: 'ISKCON Mumbai' },
  { channelId: 'UCZJEpQqJ8F6jvU4q6r1FhiA', name: 'ISKCON Bangalore' },
];

export default function App() {
  const [selectedChannel, setSelectedChannel] = useState('');

  const filteredVideos =
    selectedChannel === ''
      ? mockVideos
      : mockVideos.filter((v) => v.channelId === selectedChannel);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>ISKCON YouTube</Text>
      <View style={styles.channelBar}>
        {channels.map((ch) => (
          <TouchableOpacity
            key={ch.channelId}
            style={[
              styles.channelBtn,
              selectedChannel === ch.channelId && styles.selected,
            ]}
            onPress={() => setSelectedChannel(ch.channelId)}
          >
            <Text style={[
              styles.channelText,
              selectedChannel === ch.channelId && styles.selectedText
            ]}>{ch.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.videoId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${item.videoId}`)}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            <View style={styles.info}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.channelTitle}>{item.channelTitle}</Text>
              <Text style={styles.date}>
                {new Date(item.publishedAt).toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f5ee' },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C63324',
    textAlign: 'center',
    marginVertical: 18,
    letterSpacing: 1,
  },
  channelBar: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  channelBtn: {
    backgroundColor: '#ececec',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginRight: 8,
  },
  selected: { backgroundColor: '#C63324' },
  channelText: { color: '#222', fontWeight: 'bold' },
  selectedText: { color: '#fff' },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  thumb: {
    width: 120,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  info: { flex: 1, padding: 8, justifyContent: 'center' },
  title: { fontWeight: 'bold', fontSize: 16, color: '#222', marginBottom: 3 },
  channelTitle: { color: '#C63324', fontSize: 13, marginBottom: 2 },
  date: { fontSize: 12, color: '#777' },
};
