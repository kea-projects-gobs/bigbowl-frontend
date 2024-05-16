import bigbowlicon from "./assets/bigbowlicon.png";

export const Header = () => (
  <header className="border-b-[1px] border-border border-solid w-full pb-4 grid grid-cols-2">
    <div>
      <img className="max-w-[10rem]" src={bigbowlicon} alt="bigbowlicon" />
      <h1 className="text-2xl font-bold">BigBowl Frontend</h1>
    </div>
  </header>
);
