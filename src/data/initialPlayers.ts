import { Player } from "../types/Player";

export const player1: Player = {
  id: "A",
  name: "上原",
  victoryPoint: 0,
  fighters: [
    {
      id: 1,
      name: "聖騎士",
      maxHp: 6,
      currentHp: 6,
      agl: 3,
      def: 5,
      sleep: 0,
      move: {
        name: "エクスカリバー",
        atk: 6,
        range: 1,
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
      maxHp: 5,
      currentHp: 5,
      agl: 3,
      def: 4,
      sleep: 0,
      move: {
        name: "弓狙撃",
        atk: 4,
        range: 3,
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
      maxHp: 4,
      currentHp: 4,
      agl: 4,
      def: 5,
      sleep: 0,
      move: {
        name: "キャットレイピア",
        atk: 4,
        range: 1,
        dmg: 2,
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
  name: "吐師",
  victoryPoint: 0,
  fighters: [
    {
      id: 4,
      name: "ナーガ",
      maxHp: 4,
      currentHp: 3,
      agl: 3,
      def: 5,
      sleep: 0,
      move: {
        name: "蛇の邪眼",
        atk: 5,
        range: 2,
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
      maxHp: 5,
      currentHp: 1,
      agl: 3,
      def: 4,
      sleep: 0,
      move: {
        name: "死の奇術",
        atk: 4,
        range: 3,
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
      currentHp: 3,
      agl: 4,
      def: 4,
      sleep: 0,
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
