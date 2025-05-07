import React, { FC, useEffect, useState } from "react"
import { Text, FlatList, Image, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store";

import DropDownPicker from 'react-native-dropdown-picker';

const StudentsList: FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { students, classes } = useSelector((state: RootState) => state.users) || [];

    const [studentList, setStudentList] = useState<any[]>([]);

    const getClassesMapItems = (classes: any[]) => {
        return classes.map((item) => ({
            label: item.label,
            value: item.key,
        }));
    };
    const [open, setOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [items, setItems] = useState([...getClassesMapItems(classes) || { label: 'REC-A', value: 'REC-A' }]);


    useEffect(() => {
        dispatch({
          type: 'apiRequest',
          payload: {
            url: 'http://localhost:3001/api/user',
            method: 'POST',
            onSuccess: 'users/getAllStudents',
            onError: 'GLOBAL_MESSAGE',
            dispatchType: 'getAllStudents',
            body: {
              class_current: selectedClass,
            }
          },
        });
      }, [selectedClass, dispatch]); // Run only once

      useEffect(() => {
        setStudentList(students);
      }, [students]);

    return (
        <View style={{ ...styles.container }}>
            <View style={{ marginBottom: 20, position: 'relative' }}>
                <DropDownPicker
                    open={open}
                    value={selectedClass}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectedClass}
                    setItems={setItems}
                    listMode="MODAL"
                    modalTitle="Select Class"
                    modalProps={{
                        animationType: 'slide',
                        presentationStyle: 'formSheet',
                    }}
                    style={{ width: '1%', borderColor: '#fff', borderRadius: 8, position: 'absolute', top: -10, right: 20 }}
                    dropDownContainerStyle={{ width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}
                />
                <Text style={{...styles.container_title }}>{students?.length} Students</Text>
                <Text>{students?.length} Students from Class {selectedClass}</Text>
            </View>
            <FlatList
                data={studentList}
                renderItem={({item}) => {
                    return (
                        <View style={{...styles.infoView}} key={item.id}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: `http://localhost:3001/uploads/${item.profilePhoto}` }}
                                    style={{ ...styles.infoView_image }}
                                />
                                <View style={{ maxWidth: '75%' }}>
                                    <Text onPress={() => alert('hi')} style={{ ...styles.full_name }}>{item.firstName} {item.lastName}</Text>
                                    <Text style={{ ...styles.sub_info }}>#{item.userId}, {item.email}</Text>
                                </View>
                            </View>
                            <View>
                                <Text>Go</Text>
                            </View>
                        </View>
                    );
                }}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingTop: 20,
        padding: 16,
    },
    container_title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    infoView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        justifyContent: 'space-between',
    },
    full_name: {
        fontSize: 18,
        color: '#333',
    },
    sub_info: {
        fontSize: 14,
        color: '#666',
    },
    infoView_image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
});

export default StudentsList;
