"use client"

import Header from "@/components/header"


function ComposeHeader() {
  return (
    <Header 
    appendClassName="pt-16 bg-gray-200 pb-20" 
    tittle="My Orders Details"
    back={{historyBack: true}}
    more={{display: false}}
    thumbsUp={{display: false}}
    />
  )
}

export default ComposeHeader