import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import backArrow from "../../assets/icons/back-arrow.png";
import edit from "@/assets/icons/edit.png";
import profileD from "@/assets/images/profile.png";
import ChatMenu from "@/components/ThreeDotsMenu";
import { memo, useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import dayjs from "dayjs";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";

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
    const getChats = async () => {
      await fetchChats(page);
    };
    getChats();
  }, [page]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y < 50 && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const MessageItem = ({ item }: { item: Chat }) => {
    const isMe = item.sender.self;
    const isVerified = item.sender.is_kyc_verified;
    const messageTime = dayjs(item.time).format("hh:mm A");
    return (
      <View
        className={`flex-row items-start my-2 ${
          isMe ? "justify-end" : "justify-start"
        }`}
      >
        {!isMe && (
          <View className="relative w-8 h-8 mx-1 mr-3">
            <Image
              source={{ uri: item.sender.image }}
              className="w-8 h-8 rounded-full mx-1"
              resizeMode="cover"
            />
            {isVerified && (
              <Image
                source={require("../../assets/icons/verified.png")}
                className="w-4 h-4 absolute -bottom-1 -right-1"
                resizeMode="contain"
              />
            )}
          </View>
        )}

        <View
          className={`max-w-[75%] px-4 py-2 rounded-xl ${
            isMe ? "bg-blue-500 rounded-tr-none" : "bg-white rounded-tl-none"
          }`}
        >
          <Text
            className={`${isMe ? "text-white" : "text-black"} text-lg font-inter`}
          >
            {item.message}
          </Text>
          <Text
            className={`text-xs mt-1 ${isMe ? "text-gray-200" : "text-gray-500"}`}
          >
            {messageTime}
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Chat }) => {
    return <MessageItem item={item} />;
  };
  const handleSend = () => {
    if (value.trim() === "") return;
    const newMessage: Chat = {
      id: Date.now().toString(),
      message: value,
      time: new Date().toISOString(),
      sender: {
        self: true,
        image:
          "https://fastly.picsum.photos/id/1072/160/160.jpg?hmac=IDpbpA5neYzFjtkdFmBDKXwgr-907ewXLa9lLk9JuA8",
        is_kyc_verified: true,
      },
    };
    setChats((prev) => [...prev, newMessage]);
    setValue("");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView className="flex-1 bg-gray-100">
          <View className="w-full h-full ">
            <View className="flex flex-row items-center w-full justify-between px-3 py-6">
              <Image
                source={backArrow}
                alt="back"
                className="h-6 w-6"
                resizeMode="contain"
              />
              <Text className="flex-1 font-inter text-3xl ml-1">Trip 1</Text>
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
                  className="w-16 h-16 rounded-full border=2"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-2xl text-gray-500">
                  From{" "}
                  <Text className="font-semibold text-black">
                    {" "}
                    IGI Airport, T3
                  </Text>
                </Text>
                <Text className="text-2xl text-gray-500">
                  To{" "}
                  <Text className="font-semibold text-black"> Sector 28</Text>
                </Text>
              </View>
              <ChatMenu />
            </View>

            <View className="w-full h-[1px] bg-gray-200 mt-5"></View>
            <FlatList
              data={chats}
              keyExtractor={(item) => item.id.toString()}
              ref={listRef}
              renderItem={renderItem}
              onScroll={handleScroll}
              initialNumToRender={20}
              maxToRenderPerBatch={10}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              contentContainerStyle={{ padding: 10 }}
            />

            <View className=" relative px-6 py-10 w-full">
              <TextInput
                placeholder="Reply to @Rohit Yadav"
                className="rounded-lg pl-4 py-3 pr-16 w-full h-12 text-lg text-black bg-white"
                placeholderTextColor="#888"
                value={value}
                onChangeText={setValue}
              />
              <TouchableOpacity
                onPress={() => setShowActions(!showActions)}
                className="absolute right-20 bottom-12"
              >
                <Feather name="paperclip" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSend}
                className="absolute right-10 bottom-12"
              >
                <Feather name="send" size={22} color="#333" />
              </TouchableOpacity>
              {showActions && (
                <View className="absolute right-10 bottom-24 bg-green-700 px-3 py-4 rounded-full flex-row items-center justify-between w-32 z-10">
                  <TouchableOpacity>
                    <Feather name="camera" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Feather name="video" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Feather name="file-plus" size={20} color="white" />
                  </TouchableOpacity>

                  <View
                    className="absolute -bottom-1 right-12 w-0 h-0
  border-l-[6px] border-r-[6px] border-t-[6px]
  border-l-transparent border-r-transparent border-t-green-700"
                  />
                </View>
              )}
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
