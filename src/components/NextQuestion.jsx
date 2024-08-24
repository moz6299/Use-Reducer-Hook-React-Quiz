import React from 'react'

const NextQuestion = ({dispatch,numQuestions,index}) => {
    console.log(numQuestions);
  return (
    <div>
        { index < numQuestions && index !== numQuestions-1 && <button className='btn btn-ui'    onClick = {()=>dispatch({type:"NextQuestion"})} >Next</button>}
        { index === numQuestions-1 && <button className='btn btn-ui'    onClick = {()=>dispatch({type:"Finishing"})} >Finish</button>}
      
    </div>
  )
}

export default NextQuestion
