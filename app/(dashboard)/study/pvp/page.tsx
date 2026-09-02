"use client";

import React from "react";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { AppTopHeader, HeaderPillContainer, HeaderPillItem } from "@/shared/components/layout/AppTopHeader";
import { Swords, Home, Trophy, Sparkles } from "lucide-react";
import {
  usePvPBattle,
  PvPLobby,
  PvPMatchmaking,
  PvPArena,
  PvPResults,
} from "@/features/pvp";

export default function PvpQuizArenaPage() {
  const {
    matchType,
    setMatchType,
    gameState,
    setGameState,
    difficulty,
    setDifficulty,
    gameMode,
    setGameMode,
    roomCodeInput,
    setRoomCodeInput,
    roomCode,
    isHost,
    isRoomLoading,
    roomError,
    copiedCode,
    roomCountdown,
    searchTime,
    matchedOpponent,
    questions,
    currentQuestionIndex,
    timer,
    maxTimer,
    answered,
    selectedOptionId,
    userScore,
    opponentScore,
    userResults,
    oppResults,
    opponentStatus,
    spellingInput,
    setSpellingInput,
    scrambledLetters,
    xpAwarded,
    coinsAwarded,
    levelUp,
    startMatch,
    handleCreateRoom,
    handleJoinRoom,
    handleCopyCode,
    handleSelectOption,
    handleLetterClick,
    handleGiveUp,
    handleRematch,
    handleReturnLobby,
    playWordAudio,
  } = usePvPBattle();

  const currentPackage = questions[currentQuestionIndex] || questions[0];

  return (
    <PageEntranceWrapper className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-slate-100 pb-16">
      {/* App Top Header with Semantic Header Pills */}
      <AppTopHeader>
        <HeaderPillContainer>
          <HeaderPillItem href="/dashboard" icon={<Home className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />} label="Tổng quan" />
          <HeaderPillItem active icon={<Swords className="w-3.5 h-3.5 text-rose-500" />} label="Đấu trường 1v1" />
          <HeaderPillItem href="/leaderboard" icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />} label="Bảng xếp hạng" />
          <HeaderPillItem href="/study/exam-prep" icon={<Sparkles className="w-3.5 h-3.5 text-purple-500" />} label="Thi thử đề chuẩn" />
        </HeaderPillContainer>
      </AppTopHeader>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <MotionItem>
          {gameState === "lobby" && (
            <PvPLobby
              matchType={matchType}
              setMatchType={setMatchType}
              gameMode={gameMode}
              setGameMode={setGameMode}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              onStartMatch={startMatch}
              roomCodeInput={roomCodeInput}
              setRoomCodeInput={setRoomCodeInput}
              onJoinRoom={handleJoinRoom}
              onCreateRoom={handleCreateRoom}
              isRoomLoading={isRoomLoading}
              roomError={roomError}
            />
          )}

          {(gameState === "searching" || gameState === "room_created" || gameState === "starting_count") && (
            <PvPMatchmaking
              gameState={gameState}
              searchTime={searchTime}
              matchedOpponent={matchedOpponent}
              onCancel={() => setGameState("lobby")}
              roomCode={roomCode}
              copiedCode={copiedCode}
              onCopyRoomCode={handleCopyCode}
              isHost={isHost}
              onHostStartGame={startMatch}
              countdown={roomCountdown}
            />
          )}

          {gameState === "battle" && currentPackage && (
            <PvPArena
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              currentPackage={currentPackage}
              gameMode={gameMode}
              timer={timer}
              maxTimer={maxTimer}
              userScore={userScore}
              opponentScore={opponentScore}
              opponent={matchedOpponent}
              opponentStatus={opponentStatus}
              userResults={userResults}
              oppResults={oppResults}
              selectedOptionId={selectedOptionId}
              answered={answered}
              onSelectOption={handleSelectOption}
              onPlayAudio={() => playWordAudio(currentPackage.question.word)}
              onGiveUp={handleGiveUp}
              spellingInput={spellingInput}
              setSpellingInput={setSpellingInput}
              scrambledLetters={scrambledLetters}
              onLetterClick={handleLetterClick}
            />
          )}

          {gameState === "results" && (
            <PvPResults
              userScore={userScore}
              oppScore={opponentScore}
              opponent={matchedOpponent}
              xpAwarded={xpAwarded}
              coinsAwarded={coinsAwarded}
              levelUp={levelUp}
              onRematch={handleRematch}
              onReturnLobby={handleReturnLobby}
            />
          )}
        </MotionItem>
      </main>
    </PageEntranceWrapper>
  );
}
