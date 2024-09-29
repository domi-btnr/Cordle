import { For } from "solid-js";

import { gameState } from "../App";
import Style from "./ColorGrid.module.scss";

const ResultColor = [
    "transparent",
    "#787C7E",
    "#C9B458",
    "#6AAA64"
];

export default function ColorGrid() {
    return (
        <div class={Style.gameBoard}>
            <For each={gameState()}>
                {row => (
                    <div class={Style.gameRow}>
                        <For each={row}>
                            {cell => (
                                <div
                                    class={Style.gameCell}
                                    style={{
                                        background: cell.color,
                                        "box-shadow": cell.result ? `inset 0 0 0 5px ${ResultColor[cell.result]}, inset 0 0 0 8px #000` : "none"
                                    }}
                                />
                            )}
                        </For>
                    </div>
                )}
            </For>
        </div>
    );
}
