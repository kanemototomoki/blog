use std::fs::File;
use std::path::{Path, PathBuf};


fn main() {
  let target_file_name = "target.txt".to_string();
  let target_dir = Path::new("/foo/bar/");
  let path_to_target_file: PathBuf = target_dir.join(PathBuf::from(target_file_name));

  println!("file: {}", path_to_target_file.display());
  if path_to_target_file.is_file() {
    // "既に存在する"
    return;
  }

  // ファイルの作成
  File::create(path_to_target_file).expect("ファイルの作成に失敗しました。");
}
