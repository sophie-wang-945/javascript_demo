<?php
/*
 $_FILES["file"]["name"] - ���ϴ��ļ�������
 $_FILES["file"]["type"] - ���ϴ��ļ�������
 $_FILES["file"]["size"] - ���ϴ��ļ��Ĵ�С�����ֽڼ�
 $_FILES["file"]["tmp_name"] - �洢�ڷ��������ļ�����ʱ����������
 $_FILES["file"]["error"] - ���ļ��ϴ����µĴ������
 */
$up_maxsize = "2000000";
//�����ϴ��ļ���С,Byte
$up_savepath = "upload_shunzi";
//�洢·��,����ڱ��ļ�
$up_rename = "._bak";
// //Ϊ�˰�ȫ,����������
// /*����С�жϣ������Ի�*/
// if ($up_maxsize > 1024)//����С�жϣ������Ի�
// {
	// if ($up_maxsize > 1048576) {
// 
		// $up_maxsize_notice = substr(($up_maxsize / 1048576), 0, 5) . " Mb";
	// } else {
		// $up_maxsize_notice = substr(($up_maxsize / 1024), 0, 5) . " Kb";
	// }
// } else {
	// $up_maxsize_notice = $up_maxsize . " Byte";
// }
// /*����С�жϣ������Ի�*/
// 
// if ($_GET['act'] == 11) {
	// /*�������ļ���С*/
	// $file = $_FILES["file"];
	// if ($up_maxsize < $file["size"])
	// //����ļ���С
	// {
		// echo "<font color='red'>�ļ�̫��</font>";
		// exit ;
	// }
	// /*�������ļ���С*/
// 
	// /*������Ϊ�ϴ�ͼƬ��д*/
	// /*
	 // if ((($_FILES["file"]["type"] == "image/gif")
	 // || ($_FILES["file"]["type"] == "image/jpeg")
	 // || ($_FILES["file"]["type"] == "image/pjpeg"))
	 // && ($_FILES["file"]["size"] < $up_maxsize))
	 // */
	// if (($_FILES["file"]["size"] < $up_maxsize) and ($_FILES["file"]["size"] > 0)) {
		// if ($_FILES["file"]["error"] > 0) {
			// echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
		// } else {
			// echo "�ļ�����·��:$up_savepath/" . $_FILES["file"]["name"] . "<br />";
			// echo "Type(�ļ�����): " . $_FILES["file"]["type"] . "<br />";
			// echo "Size(�ļ���С): " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
			// echo "Temp file(�����ַ): " . $_FILES["file"]["tmp_name"] . "<br />";
// 
			// if (file_exists("$up_savepath/" . $_FILES["file"]["name"] . $up_rename))//�����ǲ���ı��ļ���
			// {
				// echo "$up_savepath/" . $_FILES["file"]["name"] . $up_rename . " �Ѿ�����. ";
			// } else {
				// $up_savepath1 = $up_savepath . "/";
				// if (!file_exists($up_savepath1)) {mkdir($up_savepath1);
				// }
				// move_uploaded_file($_FILES["file"]["tmp_name"], "$up_savepath/" . $_FILES["file"]["name"] . $up_rename);
				// echo "Stored in: " . "$up_savepath/" . $_FILES["file"]["name"] . $up_rename;
// 
			// }
		// }
	// } else {
		// echo "�ļ�����Ϊ��,Ҳ���ܴ��� $up_maxsize_notice";
	// }
	// exit ;
// }
echo $_FILES["file"]["name"];
?>