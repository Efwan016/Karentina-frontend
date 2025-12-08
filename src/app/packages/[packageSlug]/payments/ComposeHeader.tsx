"use client"

import Header from "@/components/header"


function ComposeHeader() {
  return (
    <Header 
    appendClassName="pt-16 bg-gray-200 pb-20" 
    tittle="Payment Catering"
    back={{historyBack: true}}
    more={{display: true, onClick: () => {} }}
    thumbsUp={{display: false}}
    />
  )
}

export default ComposeHeader