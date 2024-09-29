import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { createSignal, onMount } from "solid-js";

import Styles from "./App.module.scss";
import ColorGrid from "./components/ColorGrid";
import Keyboard from "./components/Keyboard";
import { generateGame } from "./utils/gameLogic";

type gameStateType = Array<Array<{ color: string; result: 0 | 1 | 2 | 3}>>;

export const [solution, setSolution] = createSignal<string[]>(generateGame());
export const [gameState, setGameState] = createSignal<gameStateType>(
    Array(6).fill(null).map(() => Array(5).fill({ color: "", result: 0 }))
);

const App = () => {
    onMount(() => {
        inject();
        injectSpeedInsights();
    });

    return (
        <>
            <div class={Styles.game}>
                <ColorGrid />
                <Keyboard />
            </div>
        </>
    );
};

export default App;
