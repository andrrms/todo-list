const mockData = [
  {
    id: 0,
    title: "Adicionando sua primeira nota",
    body: [
      'Para adicionar uma nota, clique no botão com o símbolo de "+".',
      "Digite a nota que quer escrever no campo que irá aparecer. A nota pode ter uma ou várias linhas, e tags também.",
      "Quando estiver pronto, escolha uma das quatro cores disponíveis e clique na cor novamente para adicionar a nota.",
    ],
    color: "yellow",
    done: false,
    tags: ["dicas"],
  },
  {
    id: 1,
    title: "Navegando com tags #dica",
    body: [
      "Você pode navegar pelas notas usando #tags.",
      "Tags começam com uma hashtag (#), seguida de letras e números. Traços e underlines também são permitidos.",
      "Um jeito comum de categorizar suas notas é colocando as tags na última linha ou no título, embora você possa colocar em qualquer parte da nota.",
    ],
    color: "green",
    done: false,
    tags: ["dicas"],
  },
  {
    id: 2,
    title: "Recursos planejados",
    body: [
      "A primeira parte deste app já está pronta. Você pode adicionar novas notas com diferentes cores, com tags e pode filtrar notas pelas tags.",
      "Recursos planejados para próximas atualizações:",
      "- Suporte a salvamento local de notas (banco de dados)",
      "- Modo noturno",
      "- Layout para desktops",
      "- Marcar uma nota como concluída",
      "- Poder excluir uma nota",
      "- Poder exportar e importar suas notas em um arquivo",
      "- Site poder funcionar offline",
    ],
    color: "blue",
    done: false,
    tags: ["planejado"],
  },
];
