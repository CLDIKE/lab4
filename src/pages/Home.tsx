import React, { useState } from 'react'
import {
    chakra,
    Button,
    List,
    ListItem,
    Heading,
    Flex,
    Input,
    Text,
    Stack,
    Switch,
    FormControl,
    FormLabel
} from '@chakra-ui/react'
import { MdAutoDelete, MdDoneOutline } from 'react-icons/md'

export const Home = () => {
    const [countid, setCountid] = useState(1)
    const [todos, setTodos] = useState([])
    const [text, setText] = useState('')
    const [state, setState] = useState(false)
    const [sort, setSort] = useState(false)
    const [rev, setRev] = useState([])
    const [statef, setStatef] = useState(false)
    const [filterstate, setFilterstate] = useState(false)
    const [file, setFile] = useState(null)

    const createTodoHandler = (text, state) => {
        setTodos((prevState) => [...prevState, { id: Math.floor(Math.random() * 100000) + 1, text, state }])
        setText('')
        setState(false)
    }

    const removeTodoHandler = (id) => {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
    }

    const sortTodo = () => {
        setRev([...todos])

        setTodos((prevState) => {
            return prevState.sort((a, b) => (a.text > b.text ? 1 : -1))
        })

        removeTodoHandler(0)
    }

    const reverseTodo = () => {

        setTodos((prevState) => {
            const tmp = rev;
            setRev(prevState);
            return tmp;
        })

        removeTodoHandler(0)
    }

    const sortSostTodo = () => {
        setRev([...todos])

        setTodos((prevState) => {
            return prevState.sort((a, b) => (a.state > b.state ? 1 : -1))
        })

        removeTodoHandler(0)
    }

    const filterSostTodo = () => {
        setRev([...todos])
        setTodos((prevState) => prevState.filter((todo) => todo.state == false))

        removeTodoHandler(0)
    }

    const importFromFile = () => {

    }

    const handleFile = () => {
        if (file) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                const contents = reader.result;
                const arr = contents.split('\n')
                arr.forEach((item) => createTodoHandler(item, false))
            };

        }
    }



    return (
        <Flex
            flexDirection="column"
            h="100vh"
            w="100vw"
            m="1rem"
            gap="1rem"
            alignItems="center"
        >
            <Heading textTransform="uppercase">Todo List</Heading>
            <List
                h="60hv"
                w="70vw"
                display="flex"
                flexDirection="column"
                overflowY="scroll"
                border="2px solid black"
                borderRadius="md"
                p="10px"
            >
                {todos.map((todo) => (
                    <ListItem
                        key={todo.id}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom="1px solid gray"
                        py="8px"
                    >
                        <Text>
                            {todo.state ? (
                                <Text>
                                    <Text as="del">{todo.text}</Text>: Выполнено
                                </Text>
                            ) : (
                                todo.text + ': Ещё не выполнено'
                            )}
                        </Text>
                        <Stack direction="row">
                            <Button
                                leftIcon={<MdDoneOutline />}
                                onClick={(e) => {
                                    todo.state = true
                                    removeTodoHandler(0)
                                }}
                                background="green.500"
                                color="white"
                                _hover={{
                                    background: 'green.600',
                                }}
                            >
                                Выполнено
                            </Button>
                            <Button
                                leftIcon={<MdAutoDelete />}
                                onClick={() => removeTodoHandler(todo.id)}
                                background="red.500"
                                color="white"
                                _hover={{
                                    background: 'red.600',
                                }}
                            >
                                Удалить
                            </Button>
                        </Stack>
                    </ListItem>
                ))}
            </List>
            <chakra.form
                onSubmit={(e) => {
                    e.preventDefault()
                    createTodoHandler(text, false)
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="20px"
            >
                <Input
                    placeholder="Напишите задачу..."
                    maxLength={80}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    w="300px"
                    h="32px"
                />
                <Stack direction="row">
                    <Stack>
                    <FormControl display='flex' alignItems='center'>
                        <Switch onChange={() => {
                            setSort(!sort)
                            if(sort !== true) sortTodo();
                            else reverseTodo();
                        }}/>
                        <FormLabel mb='0'>
                            Сортировать <br/> задачи по имени
                        </FormLabel>
                    </FormControl>
                    </Stack>

                    <Stack>
                    <Button
                        isDisabled={!text.trim().length}
                        type="submit"
                        w="fit-content"
                        background="blue.500"
                        color="white"
                        _hover={{
                            background: 'blue.600',
                        }}
                    >
                        Добавить задачу
                    </Button>

                    </Stack>

                    <Stack>
                        <FormControl display='flex' alignItems='center'>
                            <Switch onChange={() => {
                                setStatef(!statef)
                                if(statef !== true) sortSostTodo();
                                else reverseTodo();
                            }}/>
                            <FormLabel mb='0'>
                                Сортировать <br/> задачи по состоянию
                            </FormLabel>
                        </FormControl>
                        <FormControl display='flex' alignItems='center'>
                            <Switch onChange={() => {
                                setFilterstate(!filterstate)
                                if(filterstate !== true) filterSostTodo();
                                else reverseTodo();
                            }}/>
                            <FormLabel mb='0'>
                                Фильтровать <br/> задачи по состоянию
                            </FormLabel>
                        </FormControl>
                    </Stack>
                </Stack>
            </chakra.form>

            <chakra.form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleFile()
                }}
            >
                <Input
                    type='file'
                    accept='.txt'
                    onChange={(e) => {
                        setFile(e.target.files[0])
                    }}
                >

                </Input>
                <Button
                  w="fit-content"
                  type="submit"
                  background="blue.500"
                  color="white"
                  _hover={{
                      background: 'blue.600',
                  }}
                >
                    Импортировать задачи из файла
                </Button>
            </chakra.form>

            <chakra.form>
                <Button
                  onClick = {() => {
                      var res = ""
                      for(var i = 0; i < todos.length; i++) {
                          res += todos[i].text
                          if(i != todos.length - 1) res += "\n"
                      }

                      var data = new Blob([res], {
                            type: 'text/plain'
                        }),
                        dataURL = window.URL.createObjectURL(data),
                        tempLink = document.createElement('a');
                      tempLink.href = dataURL;
                      tempLink.setAttribute('download', 'export.txt');
                      tempLink.click();
                  }}
                  type="submit"
                  w="fit-content"
                  background="blue.500"
                  color="white"
                  _hover={{
                      background: 'blue.600',
                  }}
                >
                    Экспортировать задачи в файл
                </Button>
            </chakra.form>


        </Flex>
    )
}