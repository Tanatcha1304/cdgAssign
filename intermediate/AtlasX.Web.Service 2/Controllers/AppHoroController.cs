using Microsoft.AspNetCore.Mvc;
using AtlasX.Engine.Connector;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class AppHoroController: ControllerBase{
    public AppHoroController() {}

    [HttpGet]
    public IActionResult Index()
    {
        QueryParameter queryParameters = new QueryParameter(Request);
        
        if(queryParameters["NAME"] is null){
            return BadRequest("Missing parameter: name");
        }
        string name = queryParameters["NAME"].ToString();

        int l = name.Length;
        int sum = 0;
        for(int i = 0; i < l; i++){
            sum += name[i];
        }
        sum = sum%10;

        
        string grade = "";
        int star = 0;
        if(sum >= 0 && sum <=3){
            grade = "bad";
            star = 1;
        }else if(sum >3 && sum <=6 ){
            grade = "so so";
            star = 2;
        }else if(sum >6 && sum <=9){
            grade = "good";
            star = 3;
        }

        var result = new Dictionary<string, object>();
        result.Add("success", true);
        result.Add("grade", grade);
        result.Add("star", star);

        return Ok(result);
    }

    
}

