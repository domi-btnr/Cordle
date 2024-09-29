export const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#00FF7F",
    "#FF1493",
    "#1E90FF",
    "#FF4500",
    "#7FFF00"
];

export const generateGame = (length: number = 5): string[] => {
    const shuffledColors = [...colors].sort(() => 0.5 - Math.random());
    return shuffledColors.slice(0, length);
};

export const checkGuess = (guess: string[], solution: string[]): Array<0 | 1 | 2 | 3> => {
    const result = new Array(guess.length).fill(1);

    guess.forEach((color, index) => {
        if (color === solution[index])
            result[index] = 3;
        else if (solution.includes(color))
            result[index] = 2;
    });

    return result;
};
