import React from 'react'
import Provider from './provider';
function Workspacelayout  (
    {
        children,
      }: Readonly<{
        children: React.ReactNode;
      }>
) {
  return (
    <div>
        <Provider/>
        {children}
    </div>
  )
}

export default Workspacelayout