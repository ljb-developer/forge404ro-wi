//import jsonData from '../../data/forge_data_20240717.json'; // true one: forge_data_20240613
import TokenComponent from './Token';
import './UserTokens.css';

export function UserTokens(props) {

  let accountAddress = props.userAddress;
  let nfts = props.forgedTokens ?? [];
   
  //let nftIds = jsonData?.[accountAddress]?.nft_ids ?? [];
  // let balance = jsonData?.[accountAddress]?.eligible_forge_airdrop_amount ?? 0;
  // let benefits = jsonData?.[accountAddress]?.eligible_for_benifits ?? false; 

  return (
    <><div style={{marginBottom: "30px", fontSize: "30px", fontFamily: "FORGE"}}>{props.title}</div>
      <div className="user-tokens">
      
      {nfts.map((p, index) => (
        <TokenComponent key={index} token={p} onSelect={props.contractDissolve}/>
      ))} 

      </div>
      
      </>
 )

}

export default UserTokens;