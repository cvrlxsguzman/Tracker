import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
  View,
} from "react-native";
import DatePicker from "react-native-datepicker";
// Firebase
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";
// Styles
import styles from "./App.styles";

const App = () => {
  const [data, setData] = useState([]);
  const [breakEnd, setBreakEnd] = useState(
    `${new Date().getHours()}:${new Date().getMinutes()}`
  );
  const [breakStart, setBreakStart] = useState(
    `${new Date().getHours()}:${new Date().getMinutes()}`
  );
  const [breakLength, setBreakLength] = useState("");
  const [dateEnd, setDateEnd] = useState(
    `${new Date().getMonth() + 1}-${
      new Date().getHours() < 16
        ? new Date().getDate()
        : new Date().getDate() + 1
    }-${new Date().getFullYear()}`
  );
  const [dateStart, setDateStart] = useState(
    `${
      new Date().getMonth() + 1
    }-${new Date().getDate()}-${new Date().getFullYear()}`
  );
  const [endTime, setEndTime] = useState(
    `${
      new Date().getHours() < 16
        ? new Date().getHours() + 8
        : new Date().getHours() - 16
    }:${new Date().getMinutes()}`
  );
  const [shift, setShift] = useState("1st");
  const [startTime, setStartTime] = useState(
    `${new Date().getHours()}:${new Date().getMinutes()}`
  );
  const [totalTime, setTotalTime] = useState("");
  const shifts = [{ value: "1st" }, { value: "2nd" }, { value: "3rd" }];

  useEffect(() => {
    getData().then((r) => console.log("Data loaded" + data));
    // addTime().then((r) => {});
  }, []);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "timelogs"));
    querySnapshot.forEach((doc) => {
      setData([
        ...data,
        {
          id: doc.id,
          breakEnd: doc.data().breakEnd,
          breakLength: doc.data().breakLength,
          breakStart: doc.data().breakStart,
          dateEnd: doc.data().dateEnd,
          dateStart: doc.data().dateStart,
          endTime: doc.data().endTime,
          shift: doc.data().shift,
          startTime: doc.data().startTime,
          totalTime: doc.data().totalTime,
        },
      ]);
    });
  };

  const addTime = async () => {
    try {
      const docRef = await addDoc(collection(db, "timelogs"), {
        dateStart: dateStart,
        dateEnd: dateEnd,
        startTime: startTime,
        endTime: endTime,
        breakStart: breakStart,
        breakEnd: breakEnd,
        shift: shift,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleAddTimelog = () => {
    console.log(dateStart);
    addTime().then((r) => console.log("Timelog added"));
  };

  const Item = ({ dateStart }) => (
    <View style={{ height: 50 }}>
      <Text style={[styles.text, { marginBottom: 10 }]}>Date: {dateStart}</Text>
      {/*<Text style={styles.text}>Start Time: {r.startTime}</Text>*/}
      {/*<Text style={styles.text}>End Time: {r.endTime}</Text>*/}
    </View>
  );

  const RadioButton = ({ shifts, onSelect }) => {
    return (
      <View
        style={{ alignItems: "center", flexDirection: "row", marginBottom: 10 }}
      >
        <Text style={{ marginEnd: 10 }}>Shift:</Text>
        {shifts.map((shift) => {
          return (
            <Pressable onPress={() => setShift(shift.value)}>
              <Text style={{ marginEnd: 10 }}>{shift.value}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ marginBottom: 20 }}>Enter Time Log: </Text>

        {/*Date*/}
        <View
          style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{}}>Date Start</Text>
            <DatePicker
              style={{}}
              date={dateStart}
              mode="date"
              placeholder="select date"
              format="MM-DD-YYYY"
              minDate="03-14-1996"
              maxDate="02-25-2099"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(date) => {
                setDateStart(date);
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{}}>Date End</Text>
            <DatePicker
              style={{}}
              date={dateEnd}
              mode="date"
              placeholder="select date"
              format="MM-DD-YYYY"
              minDate="03-14-1996"
              maxDate="02-25-2099"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(date) => {
                setDateEnd(date);
              }}
            />
          </View>
        </View>

        {/*Shift*/}
        <View style={{ flexDirection: "column", marginBottom: 10 }}>
          <RadioButton shifts={shifts} />
          <Text>Shift Worked: {shift}</Text>
        </View>

        {/*Time*/}
        <View
          style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{}}>Time Start</Text>
            <DatePicker
              style={{}}
              date={startTime}
              mode="time"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(time) => {
                setStartTime(time);
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{}}>Time End</Text>
            <DatePicker
              style={{}}
              date={endTime}
              mode="time"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(time) => {
                setEndTime(time);
              }}
            />
          </View>
        </View>

        {/*Break*/}
        <View
          style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{}}>Break Start</Text>
            <DatePicker
              style={{}}
              date={breakStart}
              mode="time"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(time) => {
                setBreakStart(time);
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{}}>Break End</Text>
            <DatePicker
              style={{}}
              date={breakEnd}
              mode="time"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(time) => {
                setBreakEnd(time);
              }}
            />
          </View>
        </View>

        <Pressable
          onPress={handleAddTimelog}
          style={{ padding: 10, backgroundColor: "lightgray" }}
        >
          <Text>Enter Timelog</Text>
        </Pressable>
      </View>

      {/*<View style={{ flex: 1 }}>*/}
      {/*  {data.map((r) => (*/}
      {/*    <View key={r.id}>*/}
      {/*      <Text style={[styles.text, { marginBottom: 10 }]}>*/}
      {/*        Date: {r.dateStart}*/}
      {/*      </Text>*/}
      {/*      <Text style={styles.text}>Start Time: {r.startTime}</Text>*/}
      {/*      <Text style={styles.text}>End Time: {r.endTime}</Text>*/}
      {/*    </View>*/}
      {/*  ))}*/}
      {/*</View>*/}

      {/*<FlatList*/}
      {/*  data={data}*/}
      {/*  renderItem={({ item }) => <Item dateStart={item.dateStart} />}*/}
      {/*  keyExtractor={(item) => item.id}*/}
      {/*/>*/}
    </SafeAreaView>
  );
};

export default App;
