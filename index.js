#!/usr/bin/env node 

const fs = require("fs");
const { setFlagsFromString } = require("v8");


let arguments = process.argv.slice(2);

let flags =[];

let filenames = [];

let secondaryArguments =[];

for(let i of arguments)
{
    if(i[0] == "-")
    {
        flags.push(i);
    }
   else if(i[0] =="%") {
       {
           secondaryArguments.push(i.slice(1));
       }

    }
    else{
        filenames.push(i);
    }
}


// if(flags.length==0 && filenames.length!=0) /// if no flag is not given then we will print
// {
//     for(let file of filenames)
//     {
//         console.log(fs.readFileSync(file , "utf-8"))
//     }
// }
// else{
//     for(let flag of flags)
//     {
//         if(flag == "-rs")
//         {
//             for(let file of filenames)
//             {
//                 let fileData = fs.readFileSync(file,"utf-8");
//                 console.log(fileDeat.split(" ").join(""));
    
//             }
//         }
//     }
// }

///// optimized code 

for(let file of filenames)
{
    let fileData =fs.readFileSync(file, "utf-8");
   for(let flag of flags)
   { 
    if(flag == "-rs") /// remove all spaces of file
    {
        fileData = fileData.split(" ").join("");
    }
    if(flag =="-rn")  /// remove new line 
    {
        fileData=fileData.split("\r\n").join(""); /// \r\n represents new line
    }
    if(flag == "-rsc") /// remove special character which u want to delete   ----iske jriye new line \r\n nhi remove kr skte h
    {    
        
        for(let secondaryArgument of secondaryArguments)
        {
          fileData =fileData.split(secondaryArgument).join("");
       
        }
    }
    if(flag == "-s") /// it will add squential numbering to  all line
      {
         fileData=addSequence(fileData);
      }
      if(flag == "-sn") /// it will add squential numbering to  non-empty text
      {
        fileData = addSequenceTnel(fileData);
      }
      if(flag == "-rel") /// it will remove all extra empty line
      {
          fileData = removeExtraLine(fileData);
      }
      if(flag == "-relW1EL") /// it will remove  extra empty line with one empty line left b/w to two txt line
      {
          fileData = removeExtraLineW1EmL(fileData);
      }

   }
   console.log(fileData);
    
}

function addSequence(content)
{
   let splitedArr= content.split("\r\n");
  let j=1;
   for(let i in splitedArr)
   {  
       splitedArr[i]=j+".) " +splitedArr[i];
       j++;
   }
    return splitedArr.join("\r\n");

}


function addSequenceTnel(content)
{  
   let splited= content.split("\r\n");
  let j=1;
 
   for(let i in splited)
   {   
      if(splited[i]!="")
     {  
       splited[i]=j+".) " +splited[i];
       
       j++;
     } 
     
   }
   
    return splited.join("\r\n");

}

function removeExtraLine(content)
{
  let splitedArr =content.split("\r\n");

  for(let i=splitedArr.length-1;i>=0;i--)
  {
      if(splitedArr[i]=="")
      {
          splitedArr.splice(i,1);
      }
  }

  return splitedArr.join("\r\n");



}

function removeExtraLineW1EmL(content)
{
   let splitedArr = content.split("\r\n");

   for(let i=splitedArr.length-1;i>=1;i--)
   {
       if(splitedArr[i]=="" && splitedArr[i-1]=="")
       {
           splitedArr.splice(i,1);
       }
   }

   return splitedArr.join("\r\n");

}