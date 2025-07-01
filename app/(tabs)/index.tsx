import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import backArrow from "../../assets/icons/back-arrow.png";
import edit from "@/assets/icons/edit.png";
import profileD from "@/assets/images/profile.png";
import ChatMenu from "@/components/ThreeDotsMenu";
import { useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

export default function HomeScreen() {
  const [value, setValue] = useState("");
  const [showActions, setShowActions] = useState(false);

  const [chats, setChats] = useState<Chat[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<MetaData | null>(null);

  const listRef = useRef(null);

  const fetchChats = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://qa.corider.in/assignment/chat?page=${pageNum}`,
      );
      const newChats = response.data.chats.reverse(); // reverse for latest-at-bottom
      if (pageNum === 0) {
        setMeta({
          name: response.data.name,
          from: response.data.from,
          to: response.data.to,
        });
      }
      setChats((prev) => [...newChats, ...prev]);
    } catch (error: any) {
      console.error("Error fetching chats", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats(page);
  }, [page]);

  // const handleScroll = ({ nativeEvent }) => {
  //   if (nativeEvent.contentOffset.y < 50 && !loading) {
  //     setPage((prev) => prev + 1);
  //   }
  // };
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent } = event;
    if (nativeEvent.contentOffset.y < 50 && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const renderItem = ({ item }: { item: Chat }) => {
    const isMe = item.sender.self;
    return (
      <View
        className={`flex-row items-end my-1 ${
          isMe ? "justify-end" : "justify-start"
        }`}
      >
        <Image
          source={{ uri: item.sender.image }}
          className="w-8 h-8 rounded-full mx-1"
          resizeMode="cover"
        />

        <View
          className={`max-w-[75%] px-4 py-2 rounded-xl ${
            isMe ? "bg-blue-500 rounded-tr-none" : "bg-gray-200 rounded-tl-none"
          }`}
        >
          <Text className={`${isMe ? "text-white" : "text-black"}`}>
            {item.message}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="w-full h-full ">
        <View className="flex flex-row items-center w-full justify-between px-3 py-6">
          <Image
            source={backArrow}
            alt="back"
            className="h-6 w-6"
            resizeMode="contain"
          />
          <Text className="flex-1 font-JakartaBold text-3xl ml-1">Trip 1</Text>
          <Image
            source={edit}
            alt="back"
            className="h-6 w-6"
            resizeMode="contain"
          />
        </View>
        <View className="flex-row items-center justify-between  px-1 py-3 mx-3 rounded-xl">
          <View className="flex-row -space-x-2">
            <Image
              source={profileD}
              className="w-6 h-6 rounded-full border=2"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-2xl text-gray-500">
              From{" "}
              <Text className="font-semibold text-black"> IGI Airport, T3</Text>
            </Text>
            <Text className="text-2xl text-gray-500">
              To <Text className="font-semibold text-black"> Sector 28</Text>
            </Text>
          </View>
          <ChatMenu />
        </View>

        <View className="w-full h-[1px] bg-gray-200 mt-5"></View>
        <FlatList
          data={chats}
          ref={listRef}
          inverted
          renderItem={renderItem}
          onScroll={handleScroll}
          contentContainerStyle={{ padding: 10 }}
        />

        <View className=" relative px-6 py-2 w-full">
          <TextInput
            placeholder="Reply to @Rohit Yadav"
            className="rounded-lg pl-4 py-3 pr-16 w-full text-black bg-white"
            placeholderTextColor="#888"
            value={value}
            onChangeText={setValue}
          />
          <TouchableOpacity
            onPress={() => setShowActions(!showActions)}
            className="absolute right-20 top-4"
          >
            <Feather name="paperclip" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity className="absolute right-10 top-4">
            <Feather name="send" size={22} color="#333" />
          </TouchableOpacity>
          {showActions && (
            <View className="absolute right-12 bottom-12 bg-green-700 px-3 py-2 rounded-xl flex-row items-center space-x-4 z-10">
              <TouchableOpacity>
                <Feather name="camera" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="video" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="file-text" size={20} color="white" />
              </TouchableOpacity>

              <View className="absolute -bottom-1 right-6 w-0 h-0 border-1-[6px] border-r-[6px] border-b-[6px] border-1-transparent border-r-transparent border-b-green-700" />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
