import ChatBoard from "./js/components/chatBoard/chatBoard";

const chatWraper = document.querySelector(".ChatForFriends-wrapper");

const chatBoard = new ChatBoard(chatWraper);

chatBoard.drawUI();
