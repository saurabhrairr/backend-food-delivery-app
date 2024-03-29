Create Organization
http://localhost:8000/organizations/create

filed {name}

Create Item
http://localhost:8000/items/create
{type,descripation}


Create Pricing
http://localhost:8000/pricings/create
{ organization_id,item_id,zone,base_distance_in_km ,km_price,fix_price
}


Calculate Price
http://localhost:8000/pricings/calculate
{
    zone,
    organization_id,
    total_distance ,
    item_type
}


Update Organization
http://localhost:8000/organizations/update/:id

Update Item
http://localhost:8000/items/update/:id

Update Pricing
http://localhost:8000/pricings/update/:id

Delete Organization
http://localhost:8000/organizations/delete/:id


 Delete Item
 http://localhost:8000/items/delete/:id


  Delete Pricing
  http://localhost:8000/pricings/delete/:id


