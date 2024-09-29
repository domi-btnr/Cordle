import { For, Show } from "solid-js";

import { gameState, setGameState, solution } from "../App";
import { checkGuess, colors } from "../utils/gameLogic";
import Style from "./Keyboard.module.scss";

export default function Keyboard() {
    const keys: Array<string | { type: "Backspace" | "Enter" }> = [...colors];
    const keysPerRow = 5;
    const totalKeys = keys.length + 2;
    const rows = Math.ceil(totalKeys / keysPerRow);

    keys.splice((rows - 1) * keysPerRow, 0, { type: "Backspace" });
    keys.push({ type: "Enter" });

    const handleKeyPress = (key: string | { type: "Backspace" | "Enter" }) => {
        const currentGameState = [...gameState()];
        const currentRowIndex = currentGameState.findIndex(row =>
            row.some(cell => cell.result === 0)
        );
        if (currentRowIndex === -1) return;
        const currentRowState = [...currentGameState[currentRowIndex]];

        if (typeof key === "string") {
            const emptyCellIndex = currentRowState.findIndex(cell => cell.color === "");
            if (emptyCellIndex === -1) return;

            currentRowState[emptyCellIndex] = { ...currentRowState[emptyCellIndex], color: key };
            currentGameState[currentRowIndex] = currentRowState;

            setGameState(currentGameState);
        } else {
            if (key.type === "Backspace") {
                const lastFilledCellIndex = currentRowState.findLastIndex(cell => cell.color !== "");
                if (lastFilledCellIndex === -1) return;

                currentRowState[lastFilledCellIndex] = { ...currentRowState[lastFilledCellIndex], color: "" };
                currentGameState[currentRowIndex] = currentRowState;

                setGameState(currentGameState);
            } else if (key.type === "Enter") {
                if (currentRowState.some(cell => cell.color === "")) return;

                const guess = currentRowState.map(cell => cell.color);
                const result = checkGuess(guess, solution());

                currentRowState.forEach((cell, index) => {
                    currentRowState[index] = { ...cell, result: result[index] };
                });
                currentGameState[currentRowIndex] = currentRowState;

                setGameState(currentGameState);
            }
        }
        console.log(currentGameState);
    };

    return (
        <div class={Style.keyboard}>
            <For each={keys}>
                {key => (
                    <Show
                        when={typeof key === "object"}
                        fallback={
                            <div
                                class={Style.key}
                                style={{ background: typeof key === "string" ? key : "" }}
                                onClick={() => handleKeyPress(key)}
                            />
                        }>
                        <div
                            class={Style.key}
                            style={{ background: "#FFF" }}
                            onClick={() => handleKeyPress(key)}
                        >
                            {
                                typeof key == "object" &&
                                    key.type === "Backspace" ? "❌" : "✅"
                            }
                        </div>
                    </Show>
                )}
            </For>
        </div>
    );
}
