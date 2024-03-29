
const Joi = require("joi");
const Pricing = require("../models/Pricing");

exports.createPricing = async (req, res) => {
  try {
    const {
      organization_id,
      item_id,
      zone,
      base_distance_in_km,
      km_price,
      fix_price,
    } = req.body;
    const pricing = new Pricing({
      organization_id,
      item_id,
      zone,
      base_distance_in_km,
      km_price,
      fix_price,
    });
    await pricing.save();
    res.status(201).json(pricing);
  } catch (error) {
    console.error("Error creating pricing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.calculatePrice = async (req, res) => {
  try {
    // Input validation
    const schema = Joi.object({
      zone: Joi.string().required(),
      organization_id: Joi.string().required(),
      total_distance: Joi.number().required(),
      item_type: Joi.string().valid("perishable", "non-perishable").required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Fetch pricing details
    const pricing = await Pricing.findOne({
      organization_id: req.body.organization_id,
      zone: req.body.zone,
    }).populate("item_id");

    if (!pricing) {
      return res
        .status(404)
        .json({
          error: "Pricing not found for the given organization and zone",
        });
    }

    // Calculate price
    let totalPrice = pricing.fix_price;
    if (req.body.total_distance > pricing.base_distance_in_km) {
      totalPrice +=
        (req.body.total_distance - pricing.base_distance_in_km) *
        pricing.km_price;
    }
    if (req.body.item_type === "perishable") {
      totalPrice *= 100; // Convert to cents
    }

    // Convert totalPrice to two decimal places
    totalPrice = parseFloat(totalPrice.toFixed(2));

    return res.json({ total_price: totalPrice });
  } catch (error) {
    console.error("Error calculating price:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { base_distance_in_km, km_price, fix_price } = req.body;
    const priceupdate = await Pricing.findByIdAndUpdate(
      id,
      { base_distance_in_km, km_price, fix_price },
      { new: true }
    );
    if (!priceupdate) {
      res.status(404).json({ error: "not found" });
    }
    res.json(priceupdate);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.deleteprice=async (req, res) => {

  try{
  const{id}=req.params;
  const deleteprice=await   Pricing.findByIdAndDelete(id)

  if(!deleteprice)
  {
    res.status(404).json({ error: "not found" });
  }

  res.json(deleteprice);



  }catch (error) {

res.status(500).json({error :"internal server error"})
  }


}