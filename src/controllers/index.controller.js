const renderIndex= (req,res)=>{
    return res.render('index');
};

const renderAbout=(req,res)=>{
    return res.render('about');
};

module.exports={
    renderIndex:renderIndex,
    renderAbout:renderAbout
}