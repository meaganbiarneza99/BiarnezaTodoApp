import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, } from 'react-native';
const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  const [showModal, setShowModal] = useState(false);

  const addTask = () => {
    if (task.trim() !== '') {
      if (editMode) {
        const newTasks = [...tasks];
        newTasks[editIndex] = editedTask;
        setTasks(newTasks);
        setEditedTask('');
        setEditMode(false);
        setEditIndex(null);
        setShowModal(false);
      } else {
        setTasks([...tasks, task]);
        setTask('');
      }
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const openEditModal = (index) => {
    setTask('');
    setEditedTask(tasks[index]);
    setEditMode(true);
    setEditIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setTask('');
    setEditedTask('');
    setEditMode(false);
    setEditIndex(null);
    setShowModal(false);
  };

  const saveTask = () => {
    if (editedTask.trim() !== '') {
      const newTasks = [...tasks];
      newTasks[editIndex] = editedTask;
      setTasks(newTasks);
      setEditedTask('');
      setEditMode(false);
      setEditIndex(null);
      setShowModal(false);
    }
  };

  const renderTasks = ({ item, index }) => (
    <View style={styles.taskItem}>
      <Text>{`${index + 1}. ${item}`}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => openEditModal(index)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(index)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>To-Do List</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter task"
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.buttonText}>{editMode ? 'Save' : ' + '}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderTasks}
        />

        <Modal
          visible={showModal}
          animationType="slide"
          transparent={false}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>Edit Task</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editedTask}
                  onChangeText={(text) => setEditedTask(text)}
                />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={saveTask}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={closeModal}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    height: 50, // Fixed height for the header
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A52A2A',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#A52A2A',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#A52A2A',
    padding: 10,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#29A6A6',
    padding: 5,
    borderRadius: 3,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#A52A2A',
    padding: 5,
    borderRadius: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#29A6A6',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#A52A2A',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#A52A2A',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TodoList;