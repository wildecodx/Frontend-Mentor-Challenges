import Footer from "./Footer"
import Card from "./Card"


function App() {
  return (
    <div className="flex flex-col min-h-screen bg-darkBg ">
      <div className="mx-2 flex flex-col flex-1 justify-center items-center">
      <Card/>
      </div>
      <Footer/>
    </div>
  )
  
}

export default App;
