pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/utils/Pausable.sol";

contract Certificates is Ownable,Pausable{
    uint public schoolcount = 0;
    uint studentcount = 0;
    
    struct School{
        uint school_id;
        string school_name;
        bool registered;
        //uint[] own_students;
    }
    
    struct Cert{
        uint cert_no;
        uint school;
        string thash;
        uint256 time;
    }
    
    struct Student{
        uint256 aadhar_no;
        string fname;
        string lname;
        uint certcount;
        mapping(uint => Cert) certy;
        bool register;
        
    }
    
    mapping(uint => School)public scl;
    mapping(uint256 => Student)public student;
    
    modifier onlyRegisteredSchool(uint sch_id){
        require(scl[sch_id].registered == true,"Check the schoolId");
        _;
    } 
     modifier onlyRegisteredStudent(uint stu_id){
        require(student[stu_id].register == true,"Check the studentId");
        _;
    } 
    
    function addSchool(string memory scl_name)public{
        schoolcount++;
        scl[schoolcount].school_id = schoolcount;
        scl[schoolcount].school_name = scl_name;
        scl[schoolcount].registered = false;
        
    }

    function registerschool(uint sch_id,bool reg)public onlyOwner{
       scl[sch_id].registered = reg;
    }

    function addStudent(uint aadhar,string memory f_name,string memory l_name)public{
        studentcount++;
        student[aadhar].aadhar_no = aadhar;
        student[aadhar].fname = f_name;
        student[aadhar].lname = l_name;
        student[aadhar].register = false;
        student[aadhar].certcount = 0;
    }
    
    function registerstudent(uint aadhar,bool reg)public onlyOwner{
       student[aadhar].register = reg;
    }

    function addCertificate(uint schoolId,uint studentaadhar,string memory hash)public onlyRegisteredSchool(schoolId){ 
    student[studentaadhar].certcount++;
    uint x = student[studentaadhar].certcount;
    student[studentaadhar].certy[x] = Cert(x,schoolId,hash,now);
        //emit add(Transact_id);)
        //emit add(Transact_id);
    }
    
 
  
    function getStudent(uint aadhar)public view onlyRegisteredStudent(aadhar) returns(string memory,string memory,uint){
        return (student[aadhar].fname,student[aadhar].lname,student[aadhar].certcount);
    }
    
    function getCertificates(uint aadhar,uint count)public view returns(string memory , uint){
        return (student[aadhar].certy[count].thash,student[aadhar].certy[count].time);
    }
    
    
}

