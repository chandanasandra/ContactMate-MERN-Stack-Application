import { Box, HStack, IconButton, Text, VStack, Button} from "@chakra-ui/react";
import { GrContactInfo } from "react-icons/gr";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTrigger,
  DialogActionTrigger
} from "../../components/ui/dialog";
import { useContactStore } from "../../store/contact";
import { Toaster, toaster } from "../../components/ui/toaster"

const ContactCard = ({ contact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contactStore = useContactStore();
  const handleDelete = async ()=> {
    var deleteStatus = await contactStore.deleteContact(contact._id);
    contactStore.fetchContacts();
    if(deleteStatus.success) {
      toaster.create({
        title: 'Success',
        description: 'Contact deleted successfully',
        type: "success",
        isClosable: true
      });
    } else {
      toaster.create({
        title: 'Eroor',
        description: 'Contact couldnt be deleted. Try again later.',
        type: "error",
        isClosable: true
      });
    }
    setIsOpen(false);
  }
  return (
    <div>
    <Toaster/>
    <Box
      shadow="lg"
      p={4}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
      bgColor={'white'}
      opacity={0.9}
    >
      <HStack>
      <GrContactInfo size={50}/>
        <VStack alignItems='left' p={1}>
          <Text>{contact.name}</Text>
          <Text>{contact.email}</Text>
          <Text>{contact.phone}</Text>
          <HStack>
            <IconButton variant="outline">
              <Link to='/edit' state={{id:contact._id, name: contact.name, email:contact.email , phone:contact.phone}}>
                <MdModeEdit/>
              </Link>
            </IconButton>
            <IconButton variant="outline">
              <DialogRoot lazyMount open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
                <DialogTrigger asChild>
                  <MdDelete onClick={() => setIsOpen(true)}/>
                </DialogTrigger>
                <DialogContent>
                  <DialogBody>
                    <p>
                    Are you sure you want to delete this contact ?
                    </p>
                  </DialogBody>
                  <DialogFooter>
                    <DialogActionTrigger asChild>
                      <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    </DialogActionTrigger>
                    <Button onClick={handleDelete} colorPalette="red">Delete</Button>
                  </DialogFooter>
                  <DialogCloseTrigger />
                </DialogContent>
              </DialogRoot>
            </IconButton>
          </HStack>
        </VStack>
      </HStack>
    </Box>
    </div>
  );
};

export default ContactCard;
