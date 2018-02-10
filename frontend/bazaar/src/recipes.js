import React from 'react'
import './index.css'

export default class RecipeViewer extends React.Component {
  render() {
    return(
      <div className="list-group">
      <div className="card bg-primary xs-6 ">
        <h5 className="card-title">example text</h5>
        <div className="card-body">
          example text
        </div>
      </div>
      <div className="card bg-primary xs-6 ">
        <h5 className="card-title">example text</h5>
        <div className="card-body">
          example text
        </div>
      </div>
      <div className="card bg-primary xs-6 ">
        <h5 className="card-title">example text</h5>
        <div className="card-body">
          example text
        </div>
      </div>
      </div>
    );
  }
}
