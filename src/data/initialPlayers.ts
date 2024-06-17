import { Player } from "../types/Player";

export const player1: Player = {
  id: "A",
  name: "Player1",
  victoryPoint: 0,
  fighters: [
    {
      id: 1,
      name: "聖騎士",
      maxHp: 9,
      currentHp: 9,
      agl: 5,
      def: 5,
      locked: 0,
      move: {
        name: "エクスカリバー",
        atk: 6,
        range: 5,
        dmg: 3,
      },
      coordinate: {
        row: 0,
        col: 0,
      },
      image: "WomanKnight.png",
    },
    {
      id: 2,
      name: "熟達の狩人",
      maxHp: 9,
      currentHp: 9,
      agl: 5,
      def: 4,
      locked: 0,
      move: {
        name: "弓狙撃",
        atk: 4,
        range: 5,
        dmg: 2,
      },
      coordinate: {
        row: 1,
        col: 1,
      },
      image: "Hunter.png",
    },
    {
      id: 3,
      name: "ケットシー",
      maxHp: 9,
      currentHp: 9,
      agl: 3,
      def: 5,
      locked: 0,
      move: {
        name: "キャットレイピア",
        atk: 9,
        range: 5,
        dmg: 9,
      },
      coordinate: {
        row: 2,
        col: 2,
      },
      image: "CaitSith.png",
    },
  ],
};

export const player2: Player = {
  id: "B",
  name: "Player2",
  victoryPoint: 0,
  fighters: [
    {
      id: 4,
      name: "ナーガ",
      maxHp: 9,
      currentHp: 9,
      agl: 2,
      def: 0,
      locked: 0,
      move: {
        name: "蛇の邪眼",
        atk: 5,
        range: 5,
        dmg: 2,
      },
      coordinate: {
        row: 3,
        col: 3,
      },
      image: "Naga.png",
    },
    {
      id: 5,
      name: "ジョーカー",
      maxHp: 9,
      currentHp: 9,
      agl: 2,
      def: 4,
      locked: 0,
      move: {
        name: "死の奇術",
        atk: 4,
        range: 2,
        dmg: 2,
      },
      coordinate: {
        row: 4,
        col: 4,
      },
      image: "Clown.png",
    },
    {
      id: 6,
      name: "ワーウルフ",
      maxHp: 6,
      currentHp: 6,
      agl: 3,
      def: 4,
      locked: 0,
      move: {
        name: "引き裂きの爪",
        atk: 4,
        range: 1,
        dmg: 1,
      },
      coordinate: {
        row: 5,
        col: 5,
      },
      image: "WolfMan.png",
    },
  ],
};
