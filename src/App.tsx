import React, { useState } from "react";
import "./App.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  Card,
  Header,
  ItemContainer,
  ItemsContainer,
  LayoutWrapper,
  StoreContainer,
} from "./app-style";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Amir",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "wine" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "cheese" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Yosi",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "pan",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "forks" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Avi",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "spices" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "bread" },
    ],
    tint: 3,
  },
];

const App = () => {
  const [stores, setStores] = useState(DATA);

  const handleDragDrop = (results: any) => {
    const { destination, source, type } = results;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "group") {
      const reordersStore = [...stores];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reordersStore.splice(sourceIndex, 1);
      reordersStore.splice(destinationIndex, 0, removedStore);

      return setStores(reordersStore);
    }
    // change item in group
    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(source.index, 1);
    newDestinationItems.splice(destination.index, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    setStores(newStores);
  };

  return (
    <LayoutWrapper>
      <Card>
        <DragDropContext onDragEnd={handleDragDrop}>
          <Header>
            <h1>Picnic list</h1>
          </Header>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {stores.map((store, index) => (
                  <Draggable
                    draggableId={store.id}
                    key={store.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <StoreList {...store} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Card>
    </LayoutWrapper>
  );
};

const StoreList = ({ name, items, id }: any) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <StoreContainer>
            <h3>{name}</h3>
          </StoreContainer>
          <ItemsContainer>
            {items.map((item: any, index: number) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <ItemContainer
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    {item.name}
                  </ItemContainer>
                )}
              </Draggable>
            ))}
          </ItemsContainer>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default App;
