

function Map({address,state}){
    let key = "lWLoL7Z2lxnnCEzvJCizqW3BjjUb92nH";
    address = address.replace(/ /g,"-");
    state = state.replace(/ /g,"-")

    let srcsetString = "https://www.mapquestapi.com/staticmap/v5/map?locations="+address+","+state+"&size=@2x&key="+key;

return (
    

    <img className="img-responsive static-map-example-image" srcSet={srcsetString}
     src={srcsetString} alt="Map with Center"/>
);



}

export default Map; 