import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    nrows:5,
    ncols:5,
    chanceLightStartsOn:0.4
  }
  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon:false,
      //since we are storing the state of each board
      board:this.createBoard()
    }
    this.flipCellsAround  =this.flipCellsAround.bind(this);
  }


  createBoard() {
    let board = [...Array(this.props.nrows)].map(()=>Array(this.props.ncols));       

    for(let i=0;i<this.props.nrows;i++)
    {
      for(let j=0;j<this.props.ncols;j++)
      {
        board[i][j] = Math.random()<this.props.chanceLightStartsOn;
      
      }
    }
    // for(let i=0;i<this.props.nrows;i++)
    // {
    //   for(let j=0;j<this.props.ncols;j++)
    //   {
    //     board[i][j] =false;
      
    //   }
    // }
    // board[1][2]=true;
    // board[0][2] =true;
    // board[1][1] =true;
    // board[1][3] =true;
    // board[2][2] =true;

    return board
  }


  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = [...this.state.board];
    // this gives the row and column number
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x);
    flipCell(y-1,x);
    flipCell(y,x-1);
    flipCell(y,x+1);
    flipCell(y+1,x);

    //  determine is the game has been won
    let win =board.every(row => row.every((value)=>value===false));
    this.setState({board, hasWon:win});
  }


  /** Render game board or winning message. */

  render() {

    return(
      <div className="Board">
        {
          this.state.hasWon?
          (
            <div className="Board-headings" style={{marginTop:'40%'}} >
        <div className="Board-heading">You</div>
        <div className="Board-sub-heading">Won!</div>
        </div>
          )
          :
          (
           <div>
               <div className="Board-headings" style={{fontSize:'.6em'}}>
                  <div className="Board-heading">Lights</div>
                  <div className="Board-sub-heading">out</div>
               </div>
              
            <table >
              <tbody>
                
                {

                  this.state.board.map((row,rowIndex)=>{
                    return <tr key={rowIndex}>
                      {
                        row.map((colItem,colIndex)=>{
                          let coordinates = `${rowIndex}-${colIndex}`;
                          return <Cell key={coordinates} flipCellsAround = {this.flipCellsAround} isLit={colItem} val ={coordinates}></Cell>
                        })
                      }
                    </tr>
                  })

                }
                
              </tbody>
            </table>
          </div> 
         
          )
        }
        
      </div>
    );

  }
}


export default Board;
