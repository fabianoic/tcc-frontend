export function loadLists() {
  return [
    {
      title: "Tarefas",
      creatable: true,
      cards: [
        {
          id: 1,
          content: "Bug 3648",
          labels: ["#7159c1"],
          user: "https://www.w3schools.com/howto/img_avatar.png",
        },
        {
          id: 2,
          content: "Bug 3213",
          labels: ["#7159c1"],
          user: "https://www.w3schools.com/howto/img_avatar2.png",
        },
        {
          id: 3,
          content: "Bug 4372",
          labels: ["#7159c1"],
          user: "https://www.w3schools.com/w3images/avatar6.png",
        },
        {
          id: 4,
          content: "Bug 3233 - Erro no salvar",
          labels: ["#54e1f7"],
          user: "https://www.w3schools.com/w3images/avatar2.png",
        },
        {
          id: 5,
          content: "Bug 3332",
          labels: ["#54e1f7"],
          user: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
    },
    {
      title: "Fazendo",
      creatable: false,
      cards: [
        {
          id: 6,
          content: "Bug 2331 - Erro de tamanho de tela",
          labels: [],
          user: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
    },
    {
      title: "Pausado",
      creatable: false,
      cards: [
        {
          id: 7,
          content: "Bug 3345 - Erro com exception",
          labels: ["#7159c1"],
          user: "https://www.w3schools.com/w3images/avatar6.png",
        },
        {
          id: 8,
          content: "Bug 1223",
          labels: ["#54e1f7"],
          user: "https://www.w3schools.com/howto/img_avatar2.png",
        },
        {
          id: 9,
          content: "Feature - Adicionar campo Nome",
          labels: [],
        },
      ],
    },
    {
      title: "Concluído",
      creatable: false,
      done: true,
      cards: [
        {
          id: 10,
          content: "Bug 2536",
          labels: [],
        },
        {
          id: 12,
          content: "Bug 2656",
          labels: ["#54e1f7"],
        },
        {
          id: 13,
          content: "Bug 2536 - Erro Mensagem",
          labels: ["#7159c1"],
        },
      ],
    },
  ];
}
