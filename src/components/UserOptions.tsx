import jsonData from '../../data/forge_data_20240717.json'; // true one: forge_data_20240613
import OptionComponent from './Option';

export function UserOptions(props) {

  let accountAddress = props.userAddress;
  let nfts = props.forgedTokens ?? [];
   
  let nftIds = jsonData?.[accountAddress]?.nft_ids ?? [];
  // let balance = jsonData?.[accountAddress]?.eligible_forge_airdrop_amount ?? 0;
  // let benefits = jsonData?.[accountAddress]?.eligible_for_benifits ?? false; 

  return (
    <><div style={{marginBottom: "30px", fontSize: "26px", fontFamily: "FORGE"}}>{props.title}</div>
      <div style={{margin: "0px 20px 40px 20px", justifyContent: "center", width: "730px", display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px"}}>
      
      {nfts.map((p, index) => (
        <OptionComponent key={index} token={p} onSelect={props.contractForge}/>
      ))} 

      </div>
      
      </>
 )

}

export default UserOptions;