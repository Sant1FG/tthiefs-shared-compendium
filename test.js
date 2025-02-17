main()

async function main(){
  console.log("Tokens: ", canvas.tokens.controlled)
  if(canvas.tokens.controlled.length == 0 || canvas.tokens.controlled.length > 1){
    ui.notifications.error("Selecciona un token");
    return;
  }
 
  let actor = canvas.tokens.controlled[0].actor

  //Comprueba si hay antorchas
  console.log("Actor: ", actor);
  let torch = actor.items.find(item => item.name == "Torch")
  if(torch == null || torch == undefined){
    ui.notifications.error("No tienes antorchas en el inventario");
    return;
  }

//Comprobar si antorcha en equipo o inventario
if (torch.container != null){ 
   //Quita una antorcha del inventario
  await torch.update({"system.quantity": torch.system.quantity - 1})
  if(torch.system.quantity < 1){
    torch.delete();
  }

 //Añade antocha a los objetos equipados
   //let equipTorch = game.items.getName('Torch')
   const torchUUID = 'Compendium.pf2e.equipment-srd.Item.8Jdw4yAzWYylGePS'
   let equipTorch = (await fromUuid(torchUUID)).toObject()
   await actor.createEmbeddedDocuments("Item",[equipTorch]);

}
      
   //Actualiza el estado de la antorcha a equipada
   let invTorch = actor.inventory.find(item => item._container == 
   undefined && item.name == 'Torch')
   updates = [ {_id: invTorch.id, "system.equipped.carryType": 
   'held'}]; 
   updates2 = [ {_id: invTorch.id, "system.equipped.handsHeld": 
   1}];
   await actor.updateEmbeddedDocuments("Item",updates);
   await actor.updateEmbeddedDocuments("Item",updates2);
   
  //Lits the torch
  const torchId = invTorch._id
   const result = await invTorch.actor.toggleRollOption("all",
  "lit-torch",torchId);
   ui.notifications.info("Antorcha encendida");
}