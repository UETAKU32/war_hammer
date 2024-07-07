# プロジェクトの概要

## 使用技術
<dl>
  <dt>使用言語</dt>
  <dd>TypeScript</dd>
  <dt>フレームワーク</dt>
  <dd>React</dd>
  <dt>ライブラリ</dt>
  <dd>MUI</dd>
  <dt>デプロイ</dt>
  <dd>https://create-react-app.dev/docs/deployment/#github-pages　の手順で実装</dd>
</dl>

# ゲームルールブック1.0
## ゲーム概要
このゲームは、2人のプレイヤーが、交互に自分のチーム（赤or青）のファイターに命令を行うゲーム  
プレイヤーは赤または青のチームを選択し、自分のチームが勝利条件を達成するように、自分チームのキャラクター（以後ファイターと記載）に命令を行う。

## 勝利条件
勝利条件は以下のいずれか
- 最終ターン後に相手より多くの勝利点を獲得している
- 相手のファイターを全滅させる

## 勝利点
勝利点は画面上部のそれぞれのチームカラーと同色の六角形の中に記載される  
勝利点の獲得方法は以下の2通り
- 敵チームのファイターのHPを0にする
- 自チームのファイターが宝物を獲得する


## チームカラーとチーム名
赤チームはTeamA、青チームはTeamBと記載される

## ターンの経過と最大ターン
ターンは赤チームから先攻で始まり、青チームの後攻の終了で1ターン経過する  
最大ターンは10ターンで、10ターン目の青チームの行動が終了するとゲームが終了する

## ファイターのステータスについて
画面両端にファイターのステータスが表示されている  
ステータスの表示のレイアウトとステータス意味は以下の通り    
| アイコン | ファイター名 | 1 HP |
|:-----------|------------:|:------------:|
| 2 移動力  | 3 防御力 | 4 行動不能 |
| 攻撃技 :  | 技の名前 | 　　 |
| 5 攻撃力 | 6 技範囲 | 7 ダメージ | 

1. HP 現在のHP/最大HP　の順番で表示される
2. 移動力　移動アクションの時、ここに記載されている数値分遠いマスへ移動できる
3. 防御力　高ければ高いほど、敵の攻撃を防御する確率が上がる
4. 行動不能　1以上だと、このファイターは攻撃アクションと移動ができない  操作プレイヤーが変わるたびに-1される（最小0）
5. 攻撃力　高ければ高いほど、攻撃をする時の成功確率とクリティカル率が上がる
6. 技範囲　攻撃アクションの時、ここに記載されている数値分遠いマスへ攻撃できる
7. ダメージ　攻撃アクションが成功した場合、攻撃対象にこの数値分のダメージを与える

## プレイヤーの命令手順
プレイヤーは以下の手順でファイターに命令を行う
1. 命令するファイターの選択（盤面のファイターをクリック又はファイターカードをクリック）
2. 命令する内容の選択　羽マーク→移動　剣マーク→攻撃　盾マーク→防御

### 移動
※行動不能状態のファイターはこの行動を行えない
1. 移動可能範囲が緑色に変化する  
2. 範囲内をクリックすると移動確認のため、ファイターが点滅する 
3. 同じ場所をクリックすると移動が確定し、手番が終了する
4. 行動を行ったファイターの行動不能ターンが+2加算される

### 攻撃
※行動不能状態のファイターはこの行動を行えない
1. 移動可能範囲が紫色に変化する
2. 範囲内に存在する敵ファイターをクリックすると、攻撃確認のため、剣マークが点滅する
3. 同じ場所をクリックすると攻撃が確定する
4. 攻撃判定が行われ、成功orクリティカルヒットだとダメージを与え押し出しに移行、失敗だと手番が終了する
5. 行動を行ったファイターの行動不能ターンが+4加算される

#### クリティカルヒット
クリティカルヒットはダメージ量に+1され、❌マークのようなアニメーションが表示される

#### 押し出し
攻撃アクションが成功orクリティカルヒットだった場合、攻撃対象のファイターをよろめかせ、1マス強制的に移動させることができる  
また、以下のように押し出しを行う
1. 押し出し可能範囲が水色に変化する
2. 範囲内をクリックすると押し出し確認のため、ファイターが点滅する
3. 同じ場所をクリックすると押し出しが確定し、手番が終了する
4. 押し出しをしたく無い場合は、攻撃をしたファイターに表示されている旗マークをクリックする
5. クリックすると旗マークが濃く表示される
6. もう一度旗マークをクリックすると、押し出しを行わずに手番が終了する

### 防御
1. 盾マークをクリックすると盾マークが濃く表示される
2. 濃く表示された盾マークをクリックすると防御アクション実行、選択したファイターを防御状態にして、手番が終了する
3. 防御状態のファイターは通常より敵の攻撃を防御する確率が上がる
4. 防御状態は攻撃又は移動のアクションを行うと解除される

## 特殊なマス
### 宝箱マス
宝箱が表示されているマス  
ファイターが宝箱マスに存在すると、手番の交代時に宝箱カウンターが-1される  
宝箱カウンターが0になるタイミングで、そのマスに存在するファイターを操作しているチームに勝利点+1を与える

### 毒沼マス
ドクロが表示されているマス  
ファイターが毒沼マスに存在すると、手番の交代時にそのファイターは1ダメージを受ける

### 侵入不可マス
何も表示されないマス  
ファイターないかなる場合も侵入不可マスに入ることはできない

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
