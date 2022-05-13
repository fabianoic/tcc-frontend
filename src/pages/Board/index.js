import React, { useState, useEffect } from "react";
import produce from "immer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import api from "../../services/api";

import BoardContext from "./context";
import { Button } from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import BoardList from "../../components/BoardList";

import {
  Container,
  ContainerList,
  Strong,
  TitleContainer,
  OptionsContainer,
} from "./styles";

function Board({ match }) {
  const { id } = match.params;
  const [lists, setLists] = useState([]);
  const [update, setUpdate] = useState(false);
  const [fromList, setFromList] = useState("");
  const [toList, setToList] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    async function loadBoardData() {
      const response = await api.get(`/projects/${id}/boardData`);
      if (response.status === 200) {
        setLists(response.data);
      } else if (response.status === 404) {
        alert("erro");
      }
    }
    loadBoardData();
  }, [id]);

  useEffect(() => {
    if (update) {
      async function updateBoardData() {
        const response = await api.put(`/projects/${id}/boardData`, {
          fromList,
          toList,
          from,
          to,
        });
        if (response.status === 200) {
          console.log("Trocou");
        } else if (response.status === 400) {
          alert("erro");
        }
      }
      setUpdate(false);
      updateBoardData();
    }
  }, [id, lists, update, fromList, toList, from, to]);

  function move(fromList, toList, from, to) {
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromList].cards[from];
        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      })
    );
    setFromList(fromList);
    setToList(toList);
    setFrom(from);
    setTo(to);
    setUpdate(true);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <PageHeader />
      <BoardContext.Provider value={{ lists, move }}>
        <Container>
          <TitleContainer>
            <Strong>Projeto Sopmac</Strong>
            <OptionsContainer>
              <Button to="/project/new" color="#3b5bfd">
                + Nova Label
              </Button>
              <Button to="/project/new" color="#3b5bfd">
                + Nova Tag
              </Button>
            </OptionsContainer>
          </TitleContainer>
          <ContainerList>
            {lists.map((list, index) => (
              <BoardList key={list.title} index={index} data={list} />
            ))}
          </ContainerList>
        </Container>
      </BoardContext.Provider>
    </DndProvider>
  );
}

export default Board;
